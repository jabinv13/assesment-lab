import { Lab } from '../types/lab';

export const labData: Lab[] = [
  {
    id: 1,
    labName: "Viswa Lab Chennai",
    location: "Chennai",
    contactPerson: "Dr. Ramesh",
    contactNumber: "9876543210",
    servicesOffered: ["Chemical Analysis", "Oil Testing", "Water Quality"],
    status: "Active",
    testMethods: [
      {
        method: "ASTM D445",
        parameters: ["Viscosity", "Temperature"],
        sampleType: "Oil"
      },
      {
        method: "ISO 7027",
        parameters: ["Turbidity"],
        sampleType: "Water"
      }
    ]
  },
  {
    id: 2,
    labName: "Viswa Lab Mumbai",
    location: "Mumbai",
    contactPerson: "Dr. Priya",
    contactNumber: "9123456789",
    servicesOffered: ["Material Testing", "Environmental Testing"],
    status: "Inactive",
    testMethods: [
      {
        method: "ISO 9001",
        parameters: ["Hardness", "Tensile Strength"],
        sampleType: "Metal"
      },
      {
        method: "EPA 8270D",
        parameters: ["Organic Pollutants"],
        sampleType: "Air"
      }
    ]
  }
];