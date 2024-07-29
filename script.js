const monthSelect = document.getElementById('monthSelect');
        const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
        const headerRow = document.getElementById('attendanceTable').getElementsByTagName('thead')[0].rows[0];

        const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

        const updateTableHeader = () => {
            const month = monthSelect.value;
            const year = new Date().getFullYear();
            const days = daysInMonth(month, year);

            // Clear existing date headers
            while (headerRow.cells.length > 2) {
                headerRow.deleteCell(1);
            }

            // Add new date headers
            for (let i = 1; i <= days; i++) {
                const th = document.createElement('th');
                th.innerText = i;
                headerRow.insertBefore(th, headerRow.cells[headerRow.cells.length - 1]);
            }
        };

        const addMember = () => {
            const row = attendanceTable.insertRow();
            const nameCell = row.insertCell(0);
            nameCell.innerHTML = `<input type="text" placeholder="Name">`;

            const month = monthSelect.value;
            const year = new Date().getFullYear();
            const days = daysInMonth(month, year);

            for (let i = 1; i <= days; i++) {
                const cell = row.insertCell(i);
                cell.innerHTML = `<input type="text" size="1" oninput="calculateAttendance(this)">`;
            }

            const totalCell = row.insertCell(days + 1);
            totalCell.innerHTML = `0`;
        };

        const removeMember = () => {
            if (attendanceTable.rows.length > 0) {
                attendanceTable.deleteRow(attendanceTable.rows.length - 1);
            }
        };

        const calculateAttendance = (input) => {
            const row = input.parentElement.parentElement;
            let total = 0;

            for (let i = 1; i < row.cells.length - 1; i++) {
                const value = row.cells[i].getElementsByTagName('input')[0].value;
                if (value == '1') {
                    total++;
                }
            }

            row.cells[row.cells.length - 1].innerText = total;
        };

        monthSelect.addEventListener('change', updateTableHeader);

        // Initialize the table with the current month
        updateTableHeader();