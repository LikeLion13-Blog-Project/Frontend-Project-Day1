const mockData = {
  success: true,
  code: 200,
  message: "게시글 조회 성공",
  data: {
    id: 2,
    title: "오늘은 오늘은 오늘은 어린이날",
    content:
      "어린이날에는 어린이처럼 놀아야해요. 유남생? 근데 내일은 최고 기온이 3도라네요 ㅠㅠ",
    author: "나현똥",
    createdAt: "2025-05-05T03:56:46.065108",
    totalLike: 0,
    comments: [
      {
        id: 4,
        content: "우왕~",
        author: "나현똥",
        createdAt: "2025-05-05T03:57:14.7047",
      },
    ],
    totalComments: 1,
  },
};

export default mockData;
