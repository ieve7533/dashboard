$(document).ready(() => {
    $('button').on('click', function (event) {
        event.preventDefault();
        const data = $(this).closest('form').serialize();
        if (!data) return;
        $.ajax({
            type: 'post',
            method: 'post',
            url: '#',
            data,
            success: () => {
                Swal.fire({
                    icon: 'success',
                    position: 'bottom-end',
                    title: 'Your changes has been saved!',
                    showConfirmButton: false,
                    timer: 1250,
                    toast: true,
                });
            },
            error: (e) => {
                const code = e.status;
                if (code >= 500 && code <= 599) return window.location.href = '/500';
                if (code === 403) return window.location.href = '/403';
                Swal.fire({
                    icon: 'error',
                    position: 'bottom-end',
                    title: `${e.responseText}`,
                    showConfirmButton: false,
                    timer: 1250,
                    toast: true,
                });
            },
        });
        return false;
    });
});