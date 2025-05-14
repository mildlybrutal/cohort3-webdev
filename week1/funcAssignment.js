function sum(n) {
    let ans = 0;
    for (let i = 1; i <= n; i++) {
        ans = i + ans;
    }

    console.log(ans);
}

sum(5);
