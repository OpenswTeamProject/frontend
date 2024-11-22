import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 요소 및 스케일 등록
ChartJS.register(
  ArcElement, // 도넛 차트
  LineElement, // 선 차트
  CategoryScale, // x축 카테고리 스케일
  LinearScale, // y축 선형 스케일
  PointElement, // 선 차트 점
  Tooltip, // 툴팁
  Legend // 범례
);
