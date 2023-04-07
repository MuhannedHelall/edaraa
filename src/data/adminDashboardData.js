import warehouseTableData from "./warehouseTableData";
import superTableItemsData from "./supervisorTableData";
import userData from "./userData";

const adminDashboardData = {
  numOfWarhouses: warehouseTableData.length,
  numOfSupervisors: superTableItemsData.length,
  numOfRequests: userData.requests.length,
};

export default adminDashboardData;
