import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class AppService {
    private perm;
    constructor(private titleService: Title) {
        this.perm = JSON.parse(localStorage.getItem('perm'));
    }

    // Set page title
    set pageTitle(value: string) {
        this.titleService.setTitle(`${value} - Cropability`);
    }

    // Check for RTL layout
    get isRTL() {
        return document.documentElement.getAttribute('dir') === 'rtl' ||
            document.body.getAttribute('dir') === 'rtl';
    }

    // Check if IE10
    get isIE10() {
        return typeof document['documentMode'] === 'number' && document['documentMode'] === 10;
    }

    // Layout navbar color
    get layoutNavbarBg() {
        return 'lighter';
    }

    // Layout sidenav color
    get layoutSidenavBg() {
        return 'light';
    }

    // Layout footer color
    get layoutFooterBg() {
        return 'lighter';
    }

    // Animate scrollTop
    scrollTop(to: number, duration: number, element = document.scrollingElement || document.documentElement) {
        if (element.scrollTop === to) { return; }
        const start = element.scrollTop;
        const change = to - start;
        const startDate = +new Date();

        // t = current time; b = start value; c = change in value; d = duration
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) { return c / 2 * t * t + b; }
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animateScroll = function() {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                element.scrollTop = to;
            }
        };

        animateScroll();
    }
    isRole(role, perm) {
        this.perm = JSON.parse(localStorage.getItem('perm'));
        for (let i = 0; i < this.perm.length; i++) {
            if (this.perm[i].feature.name === role) {
                if (this.perm[i].full === true) {
                    return true;
                }
                return this.perm[i][perm];
            }
        }
    }
}