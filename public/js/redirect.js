let redirectButton = document.querySelector("#redirect-button");
redirectButton.addEventListener("click", createRedirect)

function Copy(doc)
{
    let value = document.getElementById(doc);
    value.select()
    value.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function createRedirect()
{
    let redirect = document.querySelector("#redirect").value;

    fetch(`/api/redirect?redirect=${redirect}`, {
        method: "POST",
    }).then(e => e.json())
    .then(data => {
        if(data.status === "error")
        {
            document.querySelector("#redirectErrorValue").innerHTML = data.msg;
            $(document).ready(function(){
                $("#redirectError").modal('show');
            });
        }
        else
        {
            document.querySelector("#redirectValue").value = data.url;
            //document.querySelector("#redirectValue").innerText = data.url;
            $(document).ready(function(){
                $("#redirectModal").modal('show');
            });
        }
    })

}