pragma solidity 0.6.2;

contract TrustCare {

    event TransactionCreated(bytes32 transactionID);
    event StatusUpdated(bytes32 transactionID, uint status);

    mapping (bytes32 => uint) transactionStatus;
    address doctorsRegistry;


    function newTransaction (bytes32 transactionID) {
        transactionStatus[transactionID] = 1;
        emit TransactionCreated(transactionID);
    }

    function updateTransactionStatus(bytes32 transactionID, uint status) {
        transactionStatus[transactionID] = status;
        emit StatusUpdated(transactionID, status);
    }



}
