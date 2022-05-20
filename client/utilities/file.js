export default function download(type, data, filename) {
    const csvFile = new Blob([data], { type });
    const url = URL.createObjectURL(csvFile);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.setAttribute('hidden', 'hidden');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
