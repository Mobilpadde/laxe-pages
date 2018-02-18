window.LaxePages = (function LaxePages() {
    const o = {
        from: 'up',
    };
    let elms = [];
    let page = 0;

    let w = window.innerWidth;
    let h = window.innerHeight;

    let last = [{ x: 0, y: 0 }];
    return {
        setup: (e) => {
            elms = e;

            elms.forEach((elm, i) => {
                const s = Object.keys(o).reduce((acc, k) => {
                    acc[k] = o[k];

                    if (elm.e.dataset.hasOwnProperty(k)) {
                        acc[k] = elm.dataset[k];
                    }

                    return acc;
                }, {});

                const now = { ...last[i] };
                now.x += 0;
                now.y += h * i;

                last.push(now);

                elm.e.style.position = 'fixed';
                elm.e.style.width = w;
                elm.e.style.height = h;
                elm.e.style.top = now.y;
                elm.e.style.left = now.x;
            });

            last.shift();
            const len = last.length;
            for (let i = 0; i < len; i++) {
                var prev = { ...last[i] };
                prev.y -= h * (i + 1);
                last.unshift(prev);
            };
            
            page = last.length - elms.length;

            window.addEventListener('resize', () => {
                w = window.innerWidth;
                h = window.innerHeight;
            });
            return false;
        },

        move: (dir) => {
            page += (dir < 0 ? -1 : 1);
            if (page >= last.length) {
                page -= 1;
            } else if (page < elms.length) {
                page += 1;
            }

            elms.forEach((e, i) => {
                let pI = page - i;
                if (pI >= last.length) {
                    pI = last.length - 1;
                } else if (pI < 0) {
                    pI = last.length - pI;
                }

                e.e.style.top = last[pI].y;
                e.e.style.left = last[pI].x;
            });

            return false;
        }
    }
}());
