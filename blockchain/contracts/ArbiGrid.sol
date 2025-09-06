// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ArbiGrid
 * @dev Decentralized P2P Energy Trading Platform on Arbitrum
 */
contract ArbiGrid is ReentrancyGuard, Ownable {
    
    struct EnergyOrder {
        address seller;
        uint256 kwh;
        uint256 pricePerKwh;
        uint256 totalPrice;
        uint256 duration;
        uint256 createdAt;
        bool active;
    }
    
    struct Transaction {
        address buyer;
        address seller;
        uint256 orderId;
        uint256 amount;
        uint256 timestamp;
        bool completed;
    }
    
    // State variables
    mapping(uint256 => EnergyOrder) public orders;
    mapping(address => uint256) public balances;
    mapping(address => uint256[]) public userOrders;
    mapping(address => uint256[]) public userTransactions;
    
    uint256 public nextOrderId = 1;
    uint256 public nextTransactionId = 1;
    uint256 public platformFee = 25; // 0.25% fee
    uint256 public constant PERCENTAGE_BASE = 10000;
    
    Transaction[] public transactions;
    
    // Events
    event EnergyListed(
        address indexed seller,
        uint256 indexed orderId,
        uint256 kwh,
        uint256 pricePerKwh,
        uint256 totalPrice
    );
    
    event EnergyPurchased(
        address indexed buyer,
        address indexed seller,
        uint256 indexed orderId,
        uint256 amount
    );
    
    event FundsWithdrawn(
        address indexed user,
        uint256 amount
    );
    
    event FundsDeposited(
        address indexed user,
        uint256 amount
    );
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Create a new energy sale order
     * @param kwh Amount of energy in kilowatt-hours
     * @param pricePerKwh Price per kWh in wei
     * @param duration Duration in seconds for which the order is valid
     */
    function createSale(
        uint256 kwh, 
        uint256 pricePerKwh, 
        uint256 duration
    ) external returns (uint256) {
        require(kwh > 0, "Energy amount must be greater than 0");
        require(pricePerKwh > 0, "Price must be greater than 0");
        require(duration > 0, "Duration must be greater than 0");
        
        uint256 totalPrice = kwh * pricePerKwh;
        uint256 orderId = nextOrderId++;
        
        orders[orderId] = EnergyOrder({
            seller: msg.sender,
            kwh: kwh,
            pricePerKwh: pricePerKwh,
            totalPrice: totalPrice,
            duration: duration,
            createdAt: block.timestamp,
            active: true
        });
        
        userOrders[msg.sender].push(orderId);
        
        emit EnergyListed(msg.sender, orderId, kwh, pricePerKwh, totalPrice);
        return orderId;
    }
    
    /**
     * @dev Purchase energy from a specific order
     * @param orderId The ID of the energy order to purchase
     */
    function purchaseEnergy(uint256 orderId) external payable nonReentrant {
        EnergyOrder storage order = orders[orderId];
        require(order.active, "Order is not active");
        require(order.seller != msg.sender, "Cannot buy your own energy");
        require(block.timestamp <= order.createdAt + order.duration, "Order has expired");
        require(msg.value == order.totalPrice, "Incorrect payment amount");
        
        // Calculate platform fee
        uint256 fee = (msg.value * platformFee) / PERCENTAGE_BASE;
        uint256 sellerAmount = msg.value - fee;
        
        // Update seller balance
        balances[order.seller] += sellerAmount;
        
        // Mark order as inactive
        order.active = false;
        
        // Record transaction
        uint256 transactionId = nextTransactionId++;
        transactions.push(Transaction({
            buyer: msg.sender,
            seller: order.seller,
            orderId: orderId,
            amount: msg.value,
            timestamp: block.timestamp,
            completed: true
        }));
        
        userTransactions[msg.sender].push(transactionId - 1);
        userTransactions[order.seller].push(transactionId - 1);
        
        emit EnergyPurchased(msg.sender, order.seller, orderId, msg.value);
    }
    
    /**
     * @dev Withdraw accumulated funds
     */
    function withdrawFunds() external nonReentrant {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        balances[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(msg.sender, amount);
    }
    
    /**
     * @dev Get all active orders
     */
    function getActiveOrders() external view returns (EnergyOrder[] memory) {
        uint256 activeCount = 0;
        
        // Count active orders
        for (uint256 i = 1; i < nextOrderId; i++) {
            if (orders[i].active && block.timestamp <= orders[i].createdAt + orders[i].duration) {
                activeCount++;
            }
        }
        
        // Create array of active orders
        EnergyOrder[] memory activeOrders = new EnergyOrder[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 1; i < nextOrderId; i++) {
            if (orders[i].active && block.timestamp <= orders[i].createdAt + orders[i].duration) {
                activeOrders[index] = orders[i];
                index++;
            }
        }
        
        return activeOrders;
    }
    
    /**
     * @dev Get user's orders
     */
    function getUserOrders(address user) external view returns (uint256[] memory) {
        return userOrders[user];
    }
    
    /**
     * @dev Get user's transactions
     */
    function getUserTransactions(address user) external view returns (uint256[] memory) {
        return userTransactions[user];
    }
    
    /**
     * @dev Get transaction details
     */
    function getTransaction(uint256 transactionId) external view returns (Transaction memory) {
        require(transactionId < transactions.length, "Transaction does not exist");
        return transactions[transactionId];
    }
    
    /**
     * @dev Get user balance
     */
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
    
    /**
     * @dev Cancel an active order (only by seller)
     */
    function cancelOrder(uint256 orderId) external {
        EnergyOrder storage order = orders[orderId];
        require(order.seller == msg.sender, "Only seller can cancel order");
        require(order.active, "Order is not active");
        
        order.active = false;
    }
    
    /**
     * @dev Update platform fee (only owner)
     */
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 500, "Fee cannot exceed 5%"); // Max 5%
        platformFee = newFee;
    }
    
    /**
     * @dev Withdraw platform fees (only owner)
     */
    function withdrawPlatformFees() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        uint256 totalUserBalances = 0;
        
        // Calculate total user balances
        for (uint256 i = 1; i < nextOrderId; i++) {
            if (orders[i].seller != address(0)) {
                totalUserBalances += balances[orders[i].seller];
            }
        }
        
        uint256 platformFees = contractBalance - totalUserBalances;
        require(platformFees > 0, "No platform fees to withdraw");
        
        (bool success, ) = payable(owner()).call{value: platformFees}("");
        require(success, "Fee withdrawal failed");
    }
    
    function depositFunds() public payable {
        require(msg.value > 0, "Must deposit more than 0");
        balances[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }
    
    // Fallback functions
    receive() external payable {
        depositFunds();
    }
    
    fallback() external payable {
        depositFunds();
    }
}
