var socket = io();

function storeWebSocket(data) {
    socket.emit('data', {
        data1: data[0],
        data2: data[1]
    });
}

socket.on('data', function (datas) {
    for (const data in datas) {
        $(`#${data}`).html(`
        <div style="width: 300px; height: 350px; object-fit: cover;"><img src=${datas[data].thumbnail.source}></div>
        <div>
        <a target='_blank' href='${datas[data].content_urls.desktop.page}'>
        <h2>${datas[data].title}</h2>
        </a>
        </div>
        `);
    }

    renderArrow();
})

function getRandomWikiArticle() {
    var result = [];
    for (let i = 0; i < 2; i++) {
        $.ajax({
            url: "https://fr.wikipedia.org/api/rest_v1/page/random/summary",
            dataType: "json",
            async: false,
            success: function (data) {
                result.push(data);
            }
        });
    }
    storeWebSocket(result);
}

function renderArrow() {
    $("#icon").html('<h1><i class="fas fa-arrow-right"></i></i></h1>');
}

$("#getWord").click(function () {
    getRandomWikiArticle();
    renderArrow();
})
