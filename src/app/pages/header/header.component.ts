import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger } from '@angular/animations';

const $ = (window as any)['jQuery'];
const jQuery = (window as any)['jQuery'];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() idElementEmitter = new EventEmitter<string>();

  activeFragment = this.route.fragment.pipe();

  constructor(public route: ActivatedRoute, public router: Router) {
    /*
    $.getScript ('assets/vendor/menu/src/js/jquery.slimmenu.js', function( data, textStatus, jqxhr ) {
      console.log( data ); // Data returned
      console.log( textStatus ); // Success
      console.log( jqxhr.status ); // 200
      console.log( "Load was performed." );
    });*/
  }

  addIdElement(value: string) {
    this.idElementEmitter.emit(value);
  }

  goTo(location: string): void {
    window.location.hash = ''; 
    window.location.hash = location;
}

  reloadMenu() {
    const menu = $("#mega-menu-holder");
    if (menu.length) {

        menu.slimmenu({
            resizeWidth: '991',
            animSpeed: 'medium',
            indentChildren: true,
        }); 
    }
  }
  ngOnInit(): void {

    this.reloadMenu();

    // TODO ESTO ES EL PLUGIN DEL MENU QUE NO ESTABA FUNCIONANDO CUANDO HACIAS CAMBIO DE PÁGINA CON EL ROUTING

    var pluginName = 'slimmenu',
        oldWindowWidth = 0,
        defaults = {
            resizeWidth: '991',
            initiallyVisible: false,
            collapserTitle: '&nbsp',
            animSpeed: 'medium',
            easingEffect: null,
            indentChildren: false,
            childrenIndenter: '&nbsp;&nbsp;',
            expandIcon: '<i class="fa fa-angle-down" aria-hidden="true"></i>',
            collapseIcon: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        };

    function Plugin(element, options) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend(defaults, options);
        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var $window = $(window),
                options = this.options,
                $menu = this.$elem,
                $collapser = '<div class="menu-collapser">' + options.collapserTitle + '<div class="collapse-button"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div></div>',
                $menuCollapser;

            $menu.before($collapser);
            $menuCollapser = $menu.prev('.menu-collapser');

            $menu.on('click', '.sub-toggle', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var $parentLi = $(this).closest('li');

                if ($(this).hasClass('expanded')) {
                    $(this).removeClass('expanded').html(options.expandIcon);
                    $parentLi.find('>ul').slideUp(options.animSpeed, options.easingEffect);
                } else {
                    $(this).addClass('expanded').html(options.collapseIcon);
                    $parentLi.find('>ul').slideDown(options.animSpeed, options.easingEffect);
                }
            });

            $menuCollapser.on('click', '.collapse-button', function (e) {
                e.preventDefault();
                $menu.slideToggle(options.animSpeed, options.easingEffect);
            });

            this.resizeMenu();
            $window.on('resize', this.resizeMenu.bind(this));
            $window.trigger('resize');
        },

        resizeMenu: function () {
            var self = this,
                $window = $(window),
                windowWidth = $window.width(),
                $options = this.options,
                $menu = $(this.element),
                $menuCollapser = $('body').find('.menu-collapser');

            if (window['innerWidth'] !== undefined) {
                if (window['innerWidth'] > windowWidth) {
                    windowWidth = window['innerWidth'];
                }
            }

            if (windowWidth != oldWindowWidth) {
                oldWindowWidth = windowWidth;

                $menu.find('li').each(function () {
                    if ($(this).has('ul').length) {
                        if ($(this).addClass('has-submenu').has('.sub-toggle').length) {
                            $(this).children('.sub-toggle').html($options.expandIcon);
                        } else {
                            $(this).addClass('has-submenu').append('<span class="sub-toggle">' + $options.expandIcon + '</span>');
                        }
                    }

                    $(this).children('ul').hide().end().find('.sub-toggle').removeClass('expanded').html($options.expandIcon);
                });

                if ($options.resizeWidth >= windowWidth) {
                    if ($options.indentChildren) {
                        $menu.find('ul').each(function () {
                            var $depth = $(this).parents('ul').length;
                            if (!$(this).children('li').children('a').has('i').length) {
                                $(this).children('li').children('a').prepend(self.indent($depth, $options));
                            }
                        });
                    }

                    $menu.addClass('collapsed').find('li').has('ul').off('mouseenter mouseleave');
                    $menuCollapser.show();

                    if (!$options.initiallyVisible) {
                        $menu.hide();
                    }
                } else {
                    $menu.find('li').has('ul')
                        .on('mouseenter', function () {
                            $(this).find('>ul').stop().slideDown($options.animSpeed, $options.easingEffect);
                        })
                        .on('mouseleave', function () {
                            $(this).find('>ul').stop().slideUp($options.animSpeed, $options.easingEffect);
                        });

                    $menu.find('li > a > i').remove();
                    $menu.removeClass('collapsed').show();
                    $menuCollapser.hide();
                }
            }
        },

        indent: function (num, options) {
            var i = 0,
                $indent = '';
            for (; i < num; i++) {
                $indent += options.childrenIndenter;
            }
            return '<i>' + $indent + '</i> ';
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

  }

}
