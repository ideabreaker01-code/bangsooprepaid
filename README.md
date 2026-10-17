# 방수선불폰

선불폰 비대면 개통을 안내하는 정적 사이트입니다. 별도 프레임워크나 서버 데이터베이스 없이 HTML·CSS·JavaScript로 동작합니다.

## 페이지

- `/`: 홈페이지
- `/activation`: 간편인증서·유심 확인과 개통 준비
- `/plans`: 통신망·사용량별 요금제 비교
- `/usim`: 인증 유심 사진과 구매처
- `/faq`: 앤텔레콤 공식 FAQ를 토대로 재작성한 안내

`concept-v2.html`은 기존 시안 주소 호환용이며 검색에서는 제외합니다. 이전 가이드 URL도 유지합니다.

## 로컬 실행

```sh
python3 dev_server.py
```

주소: http://127.0.0.1:8000/

## 빌드

Node.js 24 이상으로 실행합니다. 외부 패키지는 필요하지 않습니다.

```sh
node scripts/build.mjs
```

배포 파일만 `public/`에 생성됩니다. 원본 이미지, 로컬 백업, 작업 기록 및 화면 캡처는 배포되지 않습니다. 본문 HTML과 `assets/site/`를 수정한 뒤 다시 빌드하세요.

## Vercel

`vercel.json`에 빌드 명령, `public` 출력 폴더, 확장자 없는 URL 처리가 지정되어 있습니다. 상업용 사이트는 Vercel Pro 이상 팀이 필요합니다.

연결된 GitHub 저장소: https://github.com/ideabreaker01-code/bangsooprepaid

Vercel 프로젝트: ideabreaker01-5070/bangsuphone. 운영 브랜치 `main`에 push하면 Git 연동으로 자동 빌드·배포되어 https://bangsuphone.kr 에 반영됩니다. 다른 브랜치의 변경은 미리보기 배포로 검토할 수 있습니다.

`bangsuphone.kr`을 대표 주소로 사용하는 canonical과 sitemap이 설정되어 있습니다. Vercel 이전 후에도 같은 주소와 페이지 경로를 유지합니다. DNS는 Cloudflare에서 관리하며 웹사이트는 Vercel에서 제공합니다. www.bangsuphone.kr은 대표 주소 bangsuphone.kr로 영구 이동합니다.

SEO 상세 내역 및 참고 출처는 `SEO-작업기록.md`에 있습니다. 요금제의 마지막 확인일은 2026.10.09이며, 실제 개통 조건은 공식 신청 화면에서 확인합니다.
