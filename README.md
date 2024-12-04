# Frontend

### 프론트엔드 실행 방법

---

1. **필수 설치**  
   프로젝트 실행에 필요한 패키지를 설치합니다:
   ```bash
   npm install
   ```

2. **개발 서버 실행**  
   아래 명령어를 통해 개발 서버를 실행합니다:
   ```bash
   npm run dev
   ```

3. **추가 사항**  
   - 필요한 Node.js 버전은 `.nvmrc` 또는 프로젝트 문서를 참고하세요.  
   - 환경변수가 필요한 경우, `.env` 파일을 설정해야 합니다. 예제 파일은 `.env.example`을 참고하세요.

---

### 프론트엔드 공통 개발 규칙

1. **코드 스타일**
   - **Linting**: 프로젝트에 설정된 ESLint 규칙을 준수합니다.  
     - 명령어:
       ```bash
       npm run lint
       ```
   - **Formatting**: Prettier를 사용하여 코드 포맷팅을 적용합니다.  
     - 명령어:
       ```bash
       npm run format
       ```

2. **폴더 구조**
   - 컴포넌트는 `src/components` 폴더에 저장하며, 각 컴포넌트는 개별 폴더를 가집니다.
     - 예: `src/components/Button/Button.jsx`, `src/components/Button/Button.css`
   - 페이지는 `src/pages` 폴더에 저장합니다.
     - 예: `src/pages/Home.jsx`

3. **Git 규칙**
   - **브랜치 이름**: 기능 브랜치는 `feature/`로, 버그 수정 브랜치는 `bugfix/`로 시작합니다.  
     - 예: `feature/login-page`, `bugfix/fix-header`
   - **커밋 메시지**: 명확하고 일관된 스타일로 작성합니다.  
     - 형식: `[타입]: 작업 내용`
       - 예: `feat: add login functionality`
       - 타입: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

4. **환경 변수**
   - `.env` 파일에 민감한 정보를 저장하지 않습니다. `.env.example`에 기본 구조를 명시합니다.

5. **테스트**
   - 모든 주요 기능은 테스트 코드를 작성합니다.
     - 테스트 파일 위치: `__tests__/` 폴더 또는 각 컴포넌트와 같은 위치
     - 명령어:
       ```bash
       npm run test
       ```

6. **기타 규칙**
   - 코드 리뷰는 Pull Request를 통해 진행하며, 최소 1명의 리뷰어 승인이 필요합니다.
   - 중복 코드 작성을 피하고, 공통 유틸리티 함수는 `src/utils` 폴더에 작성합니다.
   - 필요하지 않은 디버깅 코드는 PR 전에 제거합니다.
