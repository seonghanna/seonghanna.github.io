let playerCount = 5;
let currentPlayer = 0;
let blockedShot = false;
let blockedPlayer = -1;

function startGame() {
    playerCount = parseInt(document.getElementById('playerCount').value);
    currentPlayer = 0;
    blockedShot = false;
    blockedPlayer = Math.floor(Math.random() * playerCount);

    document.getElementById('inputContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    resetBallAndGoalkeeper();
}

function shoot(direction) {
    const directions = ['left', 'center', 'right'];
    const resultElement = document.getElementById('result');
    const goalkeeperElement = document.getElementById('goalkeeper');
    const ballElement = document.getElementById('ball');

    // 버튼 비활성화
    document.getElementById('leftButton').disabled = true;
    document.getElementById('centerButton').disabled = true;
    document.getElementById('rightButton').disabled = true;

    // 공의 움직임
    switch(direction) {
        case 'left':
            ballElement.style.left = '50px';
            ballElement.style.bottom = '150px';
            break;
        case 'center':
            ballElement.style.left = '140px';
            ballElement.style.bottom = '150px';
            break;
        case 'right':
            ballElement.style.left = '230px';
            ballElement.style.bottom = '150px';
            break;
    }

    let goalkeeper;
    if (currentPlayer === blockedPlayer) {
        goalkeeper = direction; // 골키퍼가 막도록 설정
        blockedShot = true;
    } else {
        goalkeeper = directions[Math.floor(Math.random() * 3)];
    }

    // 골키퍼의 움직임
    switch(goalkeeper) {
        case 'left':
            goalkeeperElement.style.left = '50px';
            break;
        case 'center':
            goalkeeperElement.style.left = '130px';
            break;
        case 'right':
            goalkeeperElement.style.left = '210px';
            break;
    }

    // 결과 처리
    if (direction === goalkeeper) {
        resultElement.textContent = `아쉽습니다! 골키퍼가 ${getKoreanDirection(direction)}으로 움직여 막았습니다.`;
    } else {
        resultElement.textContent = `골! 골키퍼는 ${getKoreanDirection(goalkeeper)}으로 움직였지만, 당신은 ${getKoreanDirection(direction)}으로 슈팅했습니다.`;
    }

    // 공을 원래 위치로 되돌리기
    setTimeout(() => {
        resetBallAndGoalkeeper();

        // 다음 슈팅을 위해 버튼 활성화
        if (currentPlayer < playerCount) {
            document.getElementById('leftButton').disabled = false;
            document.getElementById('centerButton').disabled = false;
            document.getElementById('rightButton').disabled = false;
            resultElement.textContent += ` 다음 선수 차례입니다.`;
        }
    }, 1000); // 1초 후에 공이 원래 자리로 돌아감

    currentPlayer++;
    if (currentPlayer >= playerCount) {
        document.getElementById('resetButton').style.display = 'inline-block';
    }
}

function getKoreanDirection(direction) {
    switch(direction) {
        case 'left': return '왼쪽';
        case 'center': return '가운데';
        case 'right': return '오른쪽';
    }
}

function reset() {
    // 인원수 입력 화면을 다시 표시하고, 게임 화면 숨기기
    document.getElementById('inputContainer').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';

    // 공과 골키퍼 위치 초기화
    resetBallAndGoalkeeper();

    // 결과 텍스트 초기화
    document.getElementById('result').textContent = '';

    // 버튼 활성화
    document.getElementById('leftButton').disabled = false;
    document.getElementById('centerButton').disabled = false;
    document.getElementById('rightButton').disabled = false;

    // 다시 차기 버튼 숨기기
    document.getElementById('resetButton').style.display = 'none';
}

function resetBallAndGoalkeeper() {
    const ballElement = document.getElementById('ball');
    const goalkeeperElement = document.getElementById('goalkeeper');

    ballElement.style.left = '140px';
    ballElement.style.bottom = '20px';
    goalkeeperElement.style.left = '130px';
}
