async function loadPhoneBook() {
  try {
    const response = await fetch("/api/notes/");
    const phoneBook = await response.json();
    return phoneBook;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

async function main() {
  const phoneContainer = document.getElementById("phone-book");
  const phoneBook = await loadPhoneBook();
  phoneContainer.innerHTML = `<pre>${JSON.stringify(
    String(phoneBook.map((person) => `${person.content} <br>`))
  )}</pre>`;
}

main();
