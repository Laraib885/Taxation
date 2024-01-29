export const projectId = "2DOJC0wv4QSFUWiDOw8ChpQBySv";
export const projectSecretKey = "7335853015c063ff24bc539f8600baa0";

// export const MainContractAddress = "0x2e7663a37789dD74484773275F722A7944480A08"; //LocalHost
export const MainContractAddress = "0xBD59Ae2a6C12C5cD43095Fa6C6d5f6bf7f2c5424"; //Sepolia

export const MainContractAbi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tax",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "VIN",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TaxPaid",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "regNumber",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "VehicleRegistered",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "Authority",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "RegistFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "boughtVehicles",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "changeAuthority",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_regNumber",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "infoHash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "changeOwnerShip",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentYear",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllVehicles",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBoughtVehile",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCurrentYear",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUserInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dateOfBirth",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "nationality",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "registered",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "password",
                        "type": "string"
                    }
                ],
                "internalType": "struct VehicleRecord.User",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUserVehicles",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_regNum",
                "type": "bytes32"
            }
        ],
        "name": "getVehicleByRegNum",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "VIN",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "infoHash",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "registerYear",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "paidTax",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "unpaidTax",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "taxPaid",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "sellStatus",
                        "type": "bool"
                    }
                ],
                "internalType": "struct VehicleRecord.Vehicle",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_pass",
                "type": "string"
            }
        ],
        "name": "loginUser",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "onsellVehicles",
        "outputs": [
            {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "pirceInDollar",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "ownedVehicles",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "regNumber",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_year",
                "type": "uint256"
            }
        ],
        "name": "payTax",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "dateOfBirth",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "nationality",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_pass",
                "type": "string"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_VIN",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "infoHash",
                "type": "string"
            }
        ],
        "name": "registerVehicle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "registerNumber",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "amountInDollar",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "sellVehicle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "taxAmountUSD",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "taxToYearStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "updateRegistFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "updateTaxAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "dateOfBirth",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "nationality",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "registered",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "password",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "vehicles",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "VIN",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "infoHash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "registerYear",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "paidTax",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "unpaidTax",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "taxPaid",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "sellStatus",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]