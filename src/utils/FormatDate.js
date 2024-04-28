class FormatDate {
    static formatDateFromJson(dateStr) {
        const dateObj = new Date(dateStr);
        const formattedDateStr = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
        return formattedDateStr;
    }
}

export default FormatDate