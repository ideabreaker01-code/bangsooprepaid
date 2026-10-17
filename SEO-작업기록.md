# 독립 페이지·SEO 작업 기록 (2026-10-17)

2026-10-18: Vercel 임시 운영 주소 https://bangsuphone.vercel.app 에 배포 완료. 기존 bangsuphone.kr 도메인 전환 및 검색엔진 제출은 아직 수행하지 않았습니다.

| URL | 주요 목적 |
| --- | --- |
| / | 방수선불폰 브랜드·선불폰 비대면 개통 진입 |
| /activation | 비대면 개통 방법·준비물 |
| /plans | KT·LG U+ 요금제 비교 (기존 필터·비교 기능 유지) |
| /usim | 바로유심·원칩 제품 사진 및 구매처 |
| /faq | 통신망별 가입·충전·이용 질문 |

모든 주요 페이지에 고유 title·description, canonical, Open Graph, 한국어 lang, WebSite/WebPage 구조화 데이터를 적용했습니다. 하위 페이지에는 화면의 경로 안내와 BreadcrumbList를 추가했습니다. 주요 내용은 정적 HTML이며 요금제의 상세 필터만 JS로 작동합니다. 공통 헤더·푸터의 실제 링크로 페이지를 연결하고 현재 메뉴를 표시합니다. 기존 사이트 인증 메타 태그는 보존했습니다.

concept-v2는 기존 미리보기 URL 호환용으로 같은 홈을 표시하며 noindex,follow 및 홈 canonical을 사용합니다. sitemap에는 기존 가이드 URL을 유지하고 /activation, /usim, /faq를 추가했습니다. 과거 지역 가이드의 삭제·리디렉션은 이번에 수행하지 않았습니다. 원본은 .local-backups/2026-10-17-seo에 보관했으며 배포 대상에서 제외해야 합니다.

FAQ는 사용자가 제공한 공식 K망·L망 FAQ를 읽고 질문 순서와 설명을 새로 작성했습니다. 각 답변에 통신망과 출처 링크를 표시했습니다. 제공 조건을 다른 통신망에 일반화하지 않았습니다. FAQPage 리치 결과 노출을 약속하거나 이를 위한 마크업을 추가하지 않았습니다.

참고 자료:
- https://info.n-telecom.co.kr/ntelecom-asp/products/KT_faq1.asp
- https://info.n-telecom.co.kr/ntelecom-asp/products/LG_faq.asp
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

배포 단계에서 확인할 사항:
- HTML·assets/site·기존 이미지와 sitemap/robots를 실제 호스팅에 반영합니다.
- /activation, /plans, /usim, /faq가 직접 접근·새로고침 시 200을 반환하는지 확인합니다. 로컬 서버는 .html 없는 주소를 지원하지만 기존 Worker 라우팅에도 경로를 반영해야 합니다.
- .html 변형 URL은 가능하면 확장자 없는 대표 URL로 301 처리합니다. 현재 canonical은 확장자 없는 URL입니다.
- Google Search Console·네이버 서치어드바이저에서 사이트맵 제출과 수집 요청을 진행합니다. 검색 노출·순위는 별도 확인이 필요합니다.
- 요금제 데이터는 기존 2026.10.09 확인 자료를 유지했으며 이번에 가격을 재검증하거나 변경하지 않았습니다.
