export interface AnalyzerRange {
  analyzerRangeId: number;
  rangeValue: number;
  isSelected: number;
}

export interface AnalyzerData {
  analyzerId: number;
  analyzerName: string;
  analyzerValue: number;
  analyzerUnit: string | null; 
  analyzerType: string;
  analyzerRegulationLimit: number | null;
  isValid: number;
  analyzerRangesValue: AnalyzerRange[];
}

export interface AlarmData {
  alarmId: number;
  alarmName: string;
  severity: string;
  isActive: boolean;
}

export interface DeviceData {
  deviceId: number;
  deviceName: string;
  deviceTypeId: number;
  deviceType: string;
  deviceImagePath: string;
  deviceStatusId: number;
  deviceOperationId: number;
  alarmData: AlarmData | null; 
  analyzerData: AnalyzerData[];
}

export interface LiveDataResponse {
  dateTime: string;
  deviceData: DeviceData[];
}


export interface LoggedDataRecord {
  timestamp: string;
  deviceId: number;
  deviceName: string;
  analyzerId: number;
  analyzerName: string;
  value: number;
  unit: string | null;
  status?: string;
}