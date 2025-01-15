# private-chat-app

<h3>1. 프로젝트 소개 </h3>

- 해당 프로젝트는 1:1 채팅 애플리케이션으로, 실시간으로 사용자 간 메세지를 주고받을 수 있도록 설계되었습니다.

- 서버를 실행하고 설정된 포트 4000번으로 접속을 하면, 아래와 같이 유저이름을 작성할 수 있는 화면이 실행됩니다.

  ![index html](https://github.com/user-attachments/assets/d1e79f0e-4746-47ef-a444-3b08e1c8d45e)

- 유저 이름을 입력하면, 현재 접속중인 유저의 이름이 좌측 사이드바에 노출됩니다.

  ![room](https://github.com/user-attachments/assets/22fd7374-e3ae-498a-b9fb-daead2df4473)

- 대화를 하고자 하는 유저의 이름을 클릭후, 메세지를 보낼수 있습니다.

  ![start](https://github.com/user-attachments/assets/065e13ba-1ae8-48ce-872c-65a1af198c01)

- 나에게 대화를 요청하는 사용자가 생기면, 유저이름에 빨간색의 느낌표가 생깁니다.

  ![start2](https://github.com/user-attachments/assets/f3d446ab-e691-43b5-bb25-bc2516f67e58)

- 나에게 대화를 요청하는 사용자의 유저이름을 클릭후, 대화를 이어나갈 수 있습니다.

  ![chatting](https://github.com/user-attachments/assets/f9a75940-228c-4f4d-8d76-6fda89d9cddb)

- 사용자들은 언제든 방을 퇴장할수 있으며, 퇴장 이후에는 좌측의 사이드바에서 이름이 사라지게 됩니다.

  ![exit](https://github.com/user-attachments/assets/06784066-d10e-4c74-9a88-c93b5f14fb2c)

  <br><hr><br>

<h3>2. 기능 소개</h3>

- 1:1 채팅 기능
  - 특정 사용자를 선택하면 해당 사용자와 채팅 인터페이스 활성화.
  - 선택된 사용자와의 채팅 메세지만 표시.
  - 메세지는 실시간으로 전송되며, 메세지 전송 시 시간 정보와 함께 표시.
 
- Express 연결
  - Express.js를 사용하여 서버 생성.
  - 정적 파일을 제공하며, JSON요청 처리.
