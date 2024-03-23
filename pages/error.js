export default function errorPage(element, msg="An Error Occured") {
    element.html(`
        <div class="error_container">
            <img src="/not-found.svg" alt="not found illustration">
            <p class="error_text">${msg}</p>
        </div>
    `)
}