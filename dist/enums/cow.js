"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowCategory = exports.LabelEnum = exports.CowLocation = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Buyer"] = "buyer";
    UserRole["Seller"] = "seller";
})(UserRole || (exports.UserRole = UserRole = {}));
var CowLocation;
(function (CowLocation) {
    CowLocation["Dhaka"] = "Dhaka";
    CowLocation["Chattogram"] = "Chattogram";
    CowLocation["Barishal"] = "Barishal";
    CowLocation["Rajshahi"] = "Rajshahi";
    CowLocation["Sylhet"] = "Sylhet";
    CowLocation["Comilla"] = "Comilla";
    CowLocation["Rangpur"] = "Rangpur";
    CowLocation["Mymensingh"] = "Mymensingh";
})(CowLocation || (exports.CowLocation = CowLocation = {}));
var LabelEnum;
(function (LabelEnum) {
    LabelEnum["ForSale"] = "for sale";
    LabelEnum["SoldOut"] = "sold out";
})(LabelEnum || (exports.LabelEnum = LabelEnum = {}));
var CowCategory;
(function (CowCategory) {
    CowCategory["Dairy"] = "Dairy";
    CowCategory["Beef"] = "Beef";
    CowCategory["DualPurpose"] = "Dual Purpose";
})(CowCategory || (exports.CowCategory = CowCategory = {}));
