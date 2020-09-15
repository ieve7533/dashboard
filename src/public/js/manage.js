window.onload = () => {
    $('button').on('click', save);
    function save(event) {
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
                    timer: 1500,
                    toast: true,
                });
            },
            error: (e) => {
                const code = e.status;
                if (code >= 500 && code <= 599 ) {
                    window.location.href = '/500';
                    return;
                } else if (code === 403) {
                    window.location.href = '/403';
                    return;
                }
                Swal.fire({
                    icon: 'error',
                    position: 'bottom-end',
                    title: `${e.responseText}`,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                });
            },
        });
        return false;
    }
}