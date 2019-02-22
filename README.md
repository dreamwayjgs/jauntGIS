# Jaunt GIS

Simple map visualization tool with DAUM api for Jaunt Project at CSSC/Hanyang University

## 설치법

[nodejs 설치](https://nodejs.org/ko/)
[yarn 설치](https://yarnpkg.com/en/)

  - yarn install
  - yarn start

## About 'Create React App'

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## React Component 구조

```text
Root/
└── App/
    ├── DataMaster/
    │   ├── DataSource/
    |   │   └── FileForm/
    │   └── DataContorl/
    └── MapProvider/
            └── CoordForm
```

## Utility Classes

`DataSrc`: Data source 정의 클래스 (csv, api)
`LocationFix`: fix(GPS 위치 정보 단위) 정의, map api 의 점 관련(point, marker) 처리
`DaumMapApi`: Daum map api 유틸리티 
`Debbuger`: 컴포넌트별 디버깅용

## 참고자료

[React 강좌](https://velopert.com/3613)
[다음맵API](http://apis.map.daum.net/)
