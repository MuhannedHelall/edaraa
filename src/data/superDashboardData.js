// import superWarehouseData from "./superWarehouseData";
import warehouseTableData from "./warehouseTableData";
import userData from "./userData";

let superWarehouseData = {};
warehouseTableData.map((warehouse) => {
  if (warehouse.supervisorId == userData.id) {
    superWarehouseData = warehouse;
  }
});

const superDashboardData = {
  numOfProducts: superWarehouseData.products.length,
  numOfRequests: userData.requests.length,
};

export default superDashboardData;
