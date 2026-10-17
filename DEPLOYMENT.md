# 배포 진행 상태

2026-10-18 기준:

- GitHub: https://github.com/ideabreaker01-code/bangsooprepaid
- 기존 GitHub 파일과 이력을 보존하여 소스 업로드 완료.
- Vercel 프로젝트: ideabreaker01-5070/bangsuphone
- 프로젝트 ID: prj_cWOjnV03isNwZXZVC1WPd67sVTbf
- 플랜: Hobby 유지 (유료 전환 없음).
- 프로덕션 배포 ID: dpl_AGuDeW6awLyD7isfCw6yGjPvjcRJ
- 배포 상태: READY
- 공개 주소: https://bangsuphone.vercel.app
- 배포 당시 소스 커밋: ea35d73
- 주요 페이지 5개, sitemap/robots, CSS/JS의 HTTP 200 응답 확인.
- 공개 브라우저에서 인증서→유심→개통 링크, FAQ 15개, 요금제 선택을 검증함. 브라우저 오류 없음.
- Vercel GitHub 로그인 연결 완료.
- GitHub 자동 배포 연결 완료 (2026-10-18).
- Vercel GitHub 앱의 접근 범위: ideabreaker01-code/bangsooprepaid 한 개. 설치 설정 화면에서 확인함.
- 운영 브랜치: main. main에 push하면 Vercel 프로덕션 배포가 실행되어 bangsuphone.kr에 반영됨.
- 다른 브랜치는 운영 사이트와 분리된 미리보기 배포로 확인할 수 있음.
- 2026-10-18 도메인 전환 완료: https://bangsuphone.kr 에서 Vercel 배포를 제공함.
- Cloudflare 네임서버 유지. apex/ www CNAME은 52a6706ab14e9de0.vercel-dns-017.com, DNS only로 설정.
- 기존 bangsuphone-site Worker의 custom domain 바인딩만 해제했고 Worker 자체는 보존함.
- www.bangsuphone.kr은 Vercel에서 bangsuphone.kr로 308 영구 리디렉션하며 경로를 보존함.
- HTTP는 HTTPS로 308 이동함. 인증서 검증을 포함한 HTTPS 요청과 주요 5개 페이지, sitemap, robots의 200 응답 및 x-vercel-id 헤더를 확인함.
- 변경 전 기록과 롤백 안내는 로컬 .local-backups/domain-migration-2026-10-18/before.md에 보관함.

사용자에게 Hobby의 비상업용 조건이 별도로 적용됨을 안내한 뒤, 사용자의 명시적 요청에 따라 무료 플랜 배포를 실행했습니다.
로그인 정보·.env.local·.vercel은 Git 저장소와 배포 파일에 포함하지 않습니다.
