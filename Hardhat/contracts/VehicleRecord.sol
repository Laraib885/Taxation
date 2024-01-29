// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleRecord {
    struct User {
        string name;
        uint256 dateOfBirth;
        string nationality;
        bool registered;
        string password;
    }
    address payable public Authority;

    struct Vehicle {
        address owner;
        uint256 VIN;
        string infoHash;
        uint256 registerYear;
        uint256 paidTax;
        uint256 unpaidTax;
        bool taxPaid;
        bool sellStatus;
    }

    struct VehicleSell {
        address buyer;
        uint pirceInDollar;
    }

    uint256 public currentYear;
    uint256 public taxAmountUSD;
    uint256 public RegistFee;

    bytes32[] allVehicles;
    mapping(address => User) public users;
    mapping(bytes32 => Vehicle) public vehicles;
    mapping (bytes32 => VehicleSell) public onsellVehicles;
    mapping(address => bytes32[]) public boughtVehicles;


    mapping(address => bytes32[]) public ownedVehicles;
    mapping(bytes32 => mapping(uint256 => bool)) public taxToYearStatus;

    event VehicleRegistered(bytes32 indexed regNumber, address indexed owner);
    event TaxPaid(bytes32 indexed VIN, uint256 amount);

    constructor(uint256 _tax, uint256 _fee) {
        Authority = payable(msg.sender);
        taxAmountUSD = _tax;
        RegistFee = _fee;
    }

    function registerUser(
        string memory name,
        uint256 dateOfBirth,
        string memory nationality,
        string memory _pass
    ) public {
        require(!users[msg.sender].registered, "User already registered");
        users[msg.sender] = User(name, dateOfBirth, nationality, true, _pass);
    }

    function getUserInfo() public view returns(User memory){
        return users[msg.sender];
    }
    function loginUser(string memory _pass) public view returns (bool) {
        if (
            users[msg.sender].registered &&
            keccak256(bytes(users[msg.sender].password)) ==
            keccak256(bytes(_pass))
        ) {
            return true;
        } else {
            return false;
        }
    }

    function registerVehicle(uint256 _VIN, string memory infoHash) external {
        require(users[msg.sender].registered, "User isn't registered");
        bytes32 regNumber = generateRegNum(_VIN);
        require(vehicles[regNumber].VIN == 0, "Vehicle already registered");

        vehicles[regNumber] = Vehicle(
            msg.sender,
            _VIN,
            infoHash,
            getCurrentYear(),
            0,
            taxAmountUSD,
            true,
            false
        );

        allVehicles.push(regNumber);
        ownedVehicles[msg.sender].push(regNumber);
        emit VehicleRegistered(regNumber, msg.sender);
    }

    function sellVehicle(bytes32 registerNumber, uint amountInDollar, address buyer, uint _index) public {
        require(!vehicles[registerNumber].sellStatus, "Vehicle Already on sell");
        vehicles[registerNumber].sellStatus = true;
        vehicles[registerNumber].owner = buyer;
        onsellVehicles[registerNumber] = VehicleSell(
            buyer,
            amountInDollar
        );
        boughtVehicles[buyer].push(registerNumber);

        bytes32[] storage _array = ownedVehicles[msg.sender];

        if(_index == _array.length - 1){
            _array.pop();
        }else{
            _array[_index] = _array[_array.length-1];
            _array.pop();
        }
    }

    function getBoughtVehile() public view returns(bytes32[] memory) {
        return boughtVehicles[msg.sender];
    }

    function changeOwnerShip(bytes32 _regNumber, string memory infoHash, uint _index) public {
        Vehicle storage vehicle = vehicles[_regNumber];
        require(vehicle.owner == msg.sender, "You're not owner");
        vehicle.owner = msg.sender;
        vehicle.infoHash = infoHash;
        ownedVehicles[msg.sender].push(_regNumber);
        
        bytes32[] storage _array = boughtVehicles[msg.sender];

        if(_index == _array.length - 1){
            _array.pop();
        }else{
            _array[_index] = _array[_array.length-1];
            _array.pop();
        }
    }

    function getUserVehicles() public view returns (bytes32[] memory) {
        return ownedVehicles[msg.sender];
    }

    function getVehicleByRegNum(bytes32 _regNum)
        public
        view
        returns (Vehicle memory)
    {
        return vehicles[_regNum];
    }

    function getAllVehicles() public view returns (bytes32[] memory) {
        return allVehicles;
    }

    function payTax(
        bytes32 regNumber,
        uint256 _amount,
        uint256 _year
    ) external payable {
        Vehicle storage vehicle = vehicles[regNumber];
        require(vehicle.VIN != 0, "Vehicle not registered");
        require(vehicle.owner == msg.sender, "Not the vehicle owner");
        // require(msg.value >= vehicle.unpaidTax, "Insufficient Amount");
        require(
            vehicle.registerYear == _year ||
                taxToYearStatus[regNumber][_year - 1],
            "First Pay last year Tax"
        );

        bool sent = Authority.send(_amount);
        require(sent, "Could not pay tax");
        vehicle.paidTax += vehicle.unpaidTax;
        uint256 _currentYear = getCurrentYear();
        taxToYearStatus[regNumber][_currentYear] = true;
        vehicle.unpaidTax = 0;
        vehicle.taxPaid = true;

        emit TaxPaid(regNumber, _amount);
    }

    // function getVehicle(bytes32 _regNum) external view returns (Vehicle memory){
    //     return vehicles[_regNum];
    // }

    function generateRegNum(uint256 _VIN) internal pure returns (bytes32) {
        bytes32 prefix = bytes32("taxation:ethr:");
        return bytes32(keccak256(abi.encodePacked(prefix, _VIN)));
    }

    function changeAuthority(address _addr) public {
        require(msg.sender == Authority, "You don't have permission");
        Authority = payable(_addr);
    }

    function updateTaxAmount(uint256 _amount) public {
        require(msg.sender == Authority, "You don't have permission");
        taxAmountUSD = _amount;
    }

    function updateRegistFee(uint256 _amount) public {
        require(msg.sender == Authority, "You don't have permission");
        RegistFee = _amount;
    }

    function getCurrentYear() public view returns (uint256) {
        return (block.timestamp / 31536000) + 1970; // Assuming an average year length of 31536000 seconds
    }
}
