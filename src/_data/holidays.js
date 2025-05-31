const allHolidays = [
    {
        title: "Yılbaşı",
        month: "Ocak",
        monthIndex: 0,
        day: 1,
        year: 2026,
        duration: "1 Gün",
        description: "Yeni Yıl Tatili",
        type: "other",
        slug: "yilbasi"
    },
    {
        title: "29 Ekim Cumhuriyet Bayramı",
        month: "Ekim",
        monthIndex: 9,
        day: 29,
        year: 2025,
        duration: "1 Gün",
        description: "29 Ekim Cumhuriyet Bayramı",
        type: "national",
        slug: "29-ekim-cumhuriyet-bayrami"
    },
    {
        title: "30 Ağustos Zafer Bayramı",
        month: "Ağustos",
        monthIndex: 7,
        day: 30,
        year: 2025,
        duration: "1 Gün",
        description: "30 Ağustos Zafer Bayramı",
        type: "national",
        slug: "30-agustos-zafer-bayrami"
    },
    {
        title: "Demokrasi ve Milli Birlik Günü",
        month: "Temmuz",
        monthIndex: 6,
        day: 15,
        year: 2025,
        duration: "1 Gün",
        description: "15 Temmuz Demokrasi ve Milli Birlik Günü",
        type: "national",
        slug: "demokrasi-ve-milli-birlik-gunu"
    },
    {
        title: "Kurban Bayramı",
        month: "Haziran",
        monthIndex: 5,
        day: 6,
        year: 2025,
        duration: "4 Gün",
        description: "Kurban Bayramı'nın 1. günü",
        type: "religious",
        slug: "kurban-bayrami"
    },
    {
        title: "Atatürk'ü Anma, Gençlik ve Spor Bayramı",
        month: "Mayıs",
        monthIndex: 4,
        day: 19,
        year: 2025,
        duration: "1 Gün",
        description: "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı",
        type: "national",
        slug: "ataturk-anma-genclik-ve-spor-bayrami"
    },
    {
        title: "Emek ve Dayanışma Günü",
        month: "Mayıs",
        monthIndex: 4,
        day: 1,
        year: 2025,
        duration: "1 Gün",
        description: "1 Mayıs Emek ve Dayanışma Günü",
        type: "national",
        slug: "emek-ve-dayanismagunu"
    },
    {
        title: "Ulusal Egemenlik ve Çocuk Bayramı",
        month: "Nisan",
        monthIndex: 3,
        day: 23,
        year: 2025,
        duration: "1 Gün",
        description: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı",
        type: "national",
        slug: "ulusal-egemenlik-ve-cocuk-bayrami"
    },
    {
        title: "Ramazan Bayramı",
        month: "Mart",
        monthIndex: 2,
        day: 30,
        year: 2025,
        duration: "3 Gün",
        description: "Ramazan Bayramı'nın 1. günü",
        type: "religious",
        slug: "ramazan-bayrami"
    },
    {
        title: "Yılbaşı",
        month: "Ocak",
        monthIndex: 0,
        day: 1,
        year: 2025,
        duration: "1 Gün",
        description: "Yeni Yıl Tatili",
        type: "other",
        slug: "yilbasi"
    }
];

// Use a Map to filter out duplicates based on title, keeping the first occurrence
/*
const uniqueHolidaysMap = new Map();
allHolidays.forEach(holiday => {
    if (!uniqueHolidaysMap.has(holiday.title)) {
        uniqueHolidaysMap.set(holiday.title, holiday);
    }
});

const uniqueHolidays = Array.from(uniqueHolidaysMap.values());
*/

// Export the original allHolidays array directly as requested.
module.exports = allHolidays; 