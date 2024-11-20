export const statisticsData = {
    region: "서울특별시 강남구",
    weather: "rain", // 옵션: "sunny", "cloudy", "rain"
    totalUsers: 300,
    donutChartData: [70, 30], // 각각의 도넛 비율
    lineChartData: {
      labels: ["9:00", "항목2", "항목3", "항목4", "항목5"],
      datasets: [
        {
          label: "사용량",
          data: [10, 15, 30, 25, 40],
          borderColor: "blue",
        },
        {
          label: "예상치",
          data: [5, 20, 35, 20, 50],
          borderColor: "orange",
        },
      ],
    },
  };
  