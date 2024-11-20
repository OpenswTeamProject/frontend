import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js에서 사용하는 모든 요소와 플러그인을 등록
ChartJS.register(
  ArcElement, // Donut 차트에 필요한 arc 요소
  CategoryScale, // 축 카테고리
  LinearScale, // 선형 스케일
  PointElement, // 포인트 요소
  LineElement, // 선 요소
  Tooltip, // 툴팁 표시
  Legend // 범례 표시
);

export default ChartJS;
