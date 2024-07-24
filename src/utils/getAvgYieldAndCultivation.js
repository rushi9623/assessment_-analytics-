import { agriData } from "./data";

export const getAvgYieldAndCultivation = () => {
    // Group data by crop
    const groupedByCrop = agriData.reduce((acc, curr) => {
      if (!acc[curr['Crop Name']]) {
        acc[curr['Crop Name']] = [];
      }
      acc[curr['Crop Name']].push(curr);
      return acc;
    }, {});
  
    // Calculate average yield and average cultivation area for each crop
    const cropStatistics = Object.keys(groupedByCrop).map(cropName => {
      const cropData = groupedByCrop[cropName];
      const yieldSum = cropData.reduce((sum, item) => sum + (item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0), 0);
      const areaSum = cropData.reduce((sum, item) => sum + (item['Area Under Cultivation (UOM:Ha(Hectares))'] || 0), 0);
      const totalYears = cropData.length;
  
      return {
        CropName: cropName,
        AverageYield: (yieldSum / totalYears).toFixed(3),
        AverageCultivationArea: (areaSum / totalYears).toFixed(3)
      };
    });
  
    return cropStatistics;
}