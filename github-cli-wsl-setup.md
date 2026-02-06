# WSL 환경에서 GitHub CLI(gh) 설치 가이드

## 1. 개요

GitHub CLI(`gh`)는 GitHub의 공식 커맨드라인 도구로, 터미널에서 PR 생성, 이슈 관리, 레포지토리 클론 등 GitHub 작업을 수행할 수 있습니다.

WSL 환경에서는 Linux용 `gh`를 별도로 설치해야 합니다. Windows에 설치된 `gh`와는 독립적으로 동작합니다.

## 2. 사전 준비

WSL이 정상 설치되어 있는지 확인합니다.

```bash
wsl --version
```

WSL 터미널에서 배포판을 확인합니다.

```bash
lsb_release -a
```

> 이 가이드는 Ubuntu/Debian 기반 배포판을 기준으로 작성되었습니다.

## 3. 설치 방법

### 방법 1: 공식 APT 저장소 (권장)

GitHub에서 제공하는 공식 패키지 저장소를 등록하고 설치하는 방법입니다.

```bash
# 1) 필요한 패키지 설치
type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)

# 2) GPG 키 등록
sudo mkdir -p -m 755 /etc/apt/keyrings
out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg
cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null
sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg

# 3) APT 소스 추가
sudo mkdir -p -m 755 /etc/apt/sources.list.d
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# 4) 설치
sudo apt update
sudo apt install gh -y
```

### 방법 2: Homebrew

Linuxbrew(Homebrew on Linux)가 설치되어 있다면 간단하게 설치할 수 있습니다.

```bash
brew install gh
```

### 방법 3: Conda

Conda 환경을 사용 중이라면 conda-forge 채널에서 설치합니다.

```bash
conda install gh --channel conda-forge
```

## 4. 설치 확인

```bash
gh --version
```

정상 설치 시 아래와 같이 버전 정보가 출력됩니다.

```
gh version 2.x.x (20xx-xx-xx)
```

## 5. 초기 인증 설정

설치 후 GitHub 계정 인증이 필요합니다.

```bash
gh auth login
```

대화형 프롬프트가 진행됩니다.

1. **GitHub 호스트 선택** → `GitHub.com` 또는 `GitHub Enterprise Server`
2. **프로토콜 선택** → `HTTPS` 또는 `SSH`
   - HTTPS: 별도 SSH 키 설정 없이 바로 사용 가능
   - SSH: SSH 키가 이미 설정되어 있다면 권장
3. **인증 방식 선택**
   - **Login with a web browser**: 브라우저에서 코드를 입력하여 인증 (WSL에서는 Windows 브라우저가 열림)
   - **Paste an authentication token**: GitHub에서 발급한 Personal Access Token을 직접 입력

인증 완료 후 확인:

```bash
gh auth status
```

## 6. 업그레이드 방법

### APT로 설치한 경우

```bash
sudo apt update && sudo apt install gh
```

### Homebrew로 설치한 경우

```bash
brew upgrade gh
```

### Conda로 설치한 경우

```bash
conda update gh --channel conda-forge
```

## 7. WSL 관련 주의사항

### Windows와 WSL의 gh는 별개

Windows PowerShell/CMD에 설치된 `gh`와 WSL 내부의 `gh`는 완전히 별개입니다. 각각 독립적으로 설치하고 인증해야 합니다.

```bash
# Windows에서 확인 (PowerShell)
gh --version

# WSL에서 확인
wsl -e gh --version
```

### 인증 시 `slow_down` 에러

`gh auth login`에서 브라우저 인증 중 `error: slow_down` 메시지가 나타나면, 장치 코드 인증 API의 속도 제한에 걸린 것입니다.

**해결 방법:**
- 잠시 기다린 후(30초~1분) 다시 시도
- 또는 토큰 인증 방식으로 전환: `gh auth login --with-token < token.txt`

### Git Credential 충돌

WSL과 Windows 양쪽에 `gh`가 설치된 경우, Git credential helper가 충돌할 수 있습니다. WSL 내에서 아래 명령으로 credential helper를 확인합니다.

```bash
git config --global credential.helper
```

## 8. 유용한 기본 명령어

```bash
# 레포지토리 클론
gh repo clone owner/repo

# PR 생성
gh pr create --title "제목" --body "설명"

# PR 목록 확인
gh pr list

# 이슈 목록 확인
gh issue list

# 이슈 생성
gh issue create --title "제목" --body "설명"

# 레포지토리를 브라우저에서 열기
gh browse

# 현재 인증 상태 확인
gh auth status

# 도움말
gh help
```
