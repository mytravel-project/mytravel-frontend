<!-- logo -->

# 대한민국 구석구석 클론코딩

[<img src="https://img.shields.io/badge/프로젝트 기간-2025.03.13~2025.03.20-fab2ac?style=flat&logo=&logoColor=white" />]()

</div>

## 📝 소개

"대한민국 구석구석" 사이트를 클론코딩하여 웹 아키텍처를 이해하고 보안적으로 강화된 웹 애플리케이션을 개발하는 것을 목표로 하였습니다.

<br />

### 시연영상
https://www.youtube.com/watch?v=4koD6Kqk2Ps


<br />

## 💁‍♂️ 프로젝트 팀원

|                    [송은재](https://github.com/song-eun)                    |                    [백세진](https://github.com/sejinbaek)                     |
| :-------------------------------------------: | :--------------------------------------------: |
| ![](https://github.com/song-eun.png?size=120) | ![](https://github.com/sejinbaek.png?size=120) |
|     (FE/BE) 로그인, 리뷰 기능 구현    |     (FE/BE) 회원가입, 좋아요 기능 구현     |

<br />

## ERD
![ERD](https://github.com/user-attachments/assets/580a72cd-451c-4329-9b31-0c97a4f03fc2)

<br />

## 주요 기능
### 1. 회원가입
- 정규식을 활용한 이메일, 비밀번호, 닉네임 유효성 검사
- 실시간 피드백을 통한 UX 향상
- 대한민국 행정구역 JSON을 불러와 드롭다운 및 필터링 구현
<p>
  <img src="https://github.com/user-attachments/assets/7152a287-fa6d-471b-b5f1-51f750434c40" width="350">
</p>


### 2. 로그인
- 토큰을 이용한 로그인 방식 적용
- 로그인 시도 횟수 제한 (Brute Force 공격 방어)
- 세션 스토리지를 이용하여 로그인 상태 유지
<p>
   <img src="https://github.com/user-attachments/assets/f96035c2-6a11-4e0c-8fe3-555ef94bbeef" width="400">
</p>

### 3. 좋아요
- 사용자 인증을 체크하여 로그인한 사용자만 이용 가능
- 로그아웃 후 다시 로그인해도 좋아요 상태 유지
- 비동기 처리 방식으로 좋아요 기능 구현 (토글 방식)
<p>
  <img src="https://github.com/user-attachments/assets/fcb5b63a-ce74-4b35-a8bb-a9df89878fff" width="300">
</p>

### 4. 리뷰
- 로그인한 사용자만 리뷰 작성/삭제/수정 가능
- XSS(Cross-Site Scripting) 방지를 위해 특수문자 변환 (EscapeHTML 적용)
- 본인이 작성한 리뷰만 수정·삭제 가능
<p>
  <img src="https://github.com/user-attachments/assets/b711f6e0-8da5-4a49-9d87-6ceda47598ae" width="700">
</p>


## ⚙ 기술 스택

### Front-end

<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/JavaScript.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/HTMLCSS.png?raw=true" width="80">
</div>

### Back-end

<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/SpringBoot.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Mysql.png?raw=true" width="80">
</div>

### Tools

<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Github.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Notion.png?raw=true" width="80">
</div>

<br />
