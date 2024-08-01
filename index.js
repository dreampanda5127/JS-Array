
let layout = '1';

const layouts = [
    {
        id: 'container',
        layout: 'row',
        childs: [
            {
                "id": "Square 1"
            },
            {
                "id": "Squeare Containers",
                "layout": "column",
                "childs": [
                    {
                        "id": "Square 2"
                    },
                    {
                        "id": "Square 3"
                    }
                ]
            }
        ],
    },
    {
        id: 'container',
        layout: 'row',
        childs: [
            {
                "id": "Squeare Containers",
                "layout": "column",
                "childs": [
                    {
                        "id": "Square 1"
                    },
                    {
                        "id": "Square 3 Contianers",
                        "layout": "row",
                        "childs": [
                            {
                                "id": "Square 2"
                            },
                            {
                                "id": "Square 3"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "Square 4"
            }
        ]
    }
]

const handlePreview = function () {
    let src = [];
    let images = $('#images-preview img');
    for (let i = 0; i < images.length; i ++) {
        src.push(images[i].getAttribute('src'))
    }
    let html = '';
    let i = 0;
    const display = function (element) {
        if (!element.childs) return;
        html += `<div class="d-flex gap-1 ${element.layout == 'row' ? '' : 'flex-column'}">`;
        element?.childs.map(d => {
            if (d.childs) {
                display(d);
            } else {
                console.log(d);
                html += `<img src="${src[i]}" alt="img" class="${element.layout == 'row' ? 'w-50' : ''}"/>`;
                i ++;
            }
        });
        html += `</div>`;
    }
    display(layouts[layout - 1]);
    console.log(html);
    $(`#thumbnail`).html(html);
}

const handleChange = function (e) {
    const container = document.getElementById('images-preview');
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                let img = document.createElement('img');
                img.setAttribute('src', e.target.result);
                img.setAttribute('alt', 'Thumbnail');
                container.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    }
}


$(document).ready(function () {
    $('#btn-add-image').click(function() {
        $('#images').click();
    });
    $('#images').change(function(e) {
        handleChange(e);
    });
    
    $('.layout').change(function(e) {
        layout = e.target.value;
    });

    $('#btn-preview').click(function() {
        handlePreview();
    });
    
});