function handleClick(e) {
    e.preventDefault();
    window.location.reload(false);
}


<div>
<button onClick={e => { handleClick(e) }}>
    Reset
</button>
</div>