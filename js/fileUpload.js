handleFiles(input) {

    const file = input.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);
        // Reading line by line
        allLines.map((line) => {
            console.log(line);
        });
    };

    reader.onerror = (evt) => {
        alert(evt.target.error.name);
    };

    reader.readAsText(file);
}