document.addEventListener('DOMContentLoaded', function() {
    const checkBoxes = document.querySelectorAll("input[name='check']");
    const categoryFilter = document.querySelector('.categoryfilter');
    const resetButton = document.querySelector('.reset');
    const totalCountElement = document.querySelector('.sortingbar i');

    function updateTotalCount() {
        const total = Array.from(checkBoxes)
            .filter(checkBox => checkBox.checked)
            .reduce((sum, checkBox) => {
                const numberElement = checkBox.nextElementSibling.nextElementSibling;
                return sum + (numberElement ? parseInt(numberElement.textContent, 10) : 0);
            }, 0);

        totalCountElement.textContent = `총 ${total}건`;
        toggleResetButton();
    }

    function toggleResetButton() {
        const anyChecked = Array.from(checkBoxes).some(checkBox => checkBox.checked);
        if (anyChecked) {
            resetButton.classList.add('active');
        } else {
            resetButton.classList.remove('active');
        }
    }

    checkBoxes.forEach((checkBox) => {
        checkBox.addEventListener("change", (event) => {
            const checked = event.target.checked;

            if (checked) {
                const newEl = document.createElement("div");
                newEl.id = `category_${checkBox.id}`;
                newEl.innerHTML = `
                    ${checkBox.id}
                    <svg class="remove" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M15 15L5 5M5 15L15 5" stroke="#DDDDDD" stroke-width="2"/>
                    </svg>
                `;

                categoryFilter.appendChild(newEl);

                // SVG 아이콘에 이벤트 리스너 추가
                newEl.querySelector('.remove').addEventListener('click', function() {
                    categoryFilter.removeChild(newEl);
                    checkBox.checked = false;
                    updateTotalCount();
                });

            } else {
                const itemToRemove = document.getElementById(`category_${checkBox.id}`);
                if (itemToRemove) {
                    categoryFilter.removeChild(itemToRemove);
                }
            }

            updateTotalCount();
        });
    });

    // 초기 체크된 항목 처리 (optional)
    const checkedValues = [];
    checkBoxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedValues.push(checkbox.id);
        }
    });

    categoryFilter.innerHTML = '';

    checkedValues.forEach(id => {
        const checkBox = document.getElementById(id);
        const newEl = document.createElement("div");
        newEl.id = `category_${checkBox.id}`;
        newEl.innerHTML = `
            ${checkBox.value}
            <svg class="remove" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M15 15L5 5M5 15L15 5" stroke="#DDDDDD" stroke-width="2"/>
            </svg>
        `;

        categoryFilter.appendChild(newEl);

        newEl.querySelector('.remove').addEventListener('click', function() {
            categoryFilter.removeChild(newEl);
            checkBox.checked = false;
            updateTotalCount();
        });
    });

    updateTotalCount();

    // 초기화 버튼 클릭 시 처리
    resetButton.addEventListener('click', function() {
        // categoryFilter 안의 모든 자식을 제거
        while (categoryFilter.firstChild) {
            categoryFilter.removeChild(categoryFilter.firstChild);
        }

        // 모든 체크박스 체크 해제
        checkBoxes.forEach(checkBox => {
            checkBox.checked = false;
        });

        updateTotalCount();
    });
});
