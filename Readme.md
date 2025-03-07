# Full Stack Bank App

## 📌 Project Overview
The **Full Stack Bank App** is a comprehensive banking solution that allows users to:
- Create and manage accounts
- Perform transactions
- Update user details
- View transaction history of specific users
- Access account data for all users

This project integrates a **React.js** frontend with a **Java Spring Boot** backend, providing a seamless and user-friendly banking experience.

## ✨ Features
- **Account Management**: Create, update, and delete bank accounts
- **Transactions**: Deposit, withdraw, and transfer funds
- **User Profile Updates**: Modify personal and account details
- **Transaction History**: Track and view past transactions
- **Admin Dashboard**: View and manage all user accounts

## 🛠️ Tech Stack
### Frontend:
- React.js
- Tailwind CSS
- Framer Motion (for animations)

### Backend:
- Java
- Spring Boot
- MySQL (Database)

## 🚀 Installation & Setup
### Prerequisites
Make sure you have the following installed:
- Node.js & npm (for frontend)
- Java & Spring Boot (for backend)
- MySQL (for database)

## 🏗️ Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/RoopTeja04/Bank_App.git
   cd Bank_App/backend
2. Configure MySQL database in `application.properties`:
    ```sh
    spring.datasource.url=jdbc:mysql://localhost:3306/bank_db
    spring.datasource.username=root
    spring.datasource.password=your_password
3. Build and run the Spring Boot application:
    ```sh
    mvn clean install
    mvn spring-boot:run

## 🎨 Frontend Setup
1. Clone the repository:
    ```sh
    cd myapp
2. Install dependencies:
    ```sh
    npm install
3. Start the React app:
    ```sh
    npm run dev 

## 📖 How to Use

1. Create an Account: Set up a new bank account.
2. Perform Transactions: Deposit, withdraw, or transfer money.
3. Update Details: Modify user and account information.
4. View History: Track past transactions and account details.

## 👨‍💻 Contributors

[Roop Teja G](https://github.com/RoopTeja04) (Lead Developer)

[Sai Nath A](https://github.com/Sainath8688) (Backend Developer)

## 📜 License

This project is licensed under the MIT License. Feel free to modify and distribute it