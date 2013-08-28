/*global window, document, jQuery, OI, OI, UTIL*/
window.OI = window.OI || {};
OI.UTIL = OI.UTIL || {};

var preventTwice;
(function (window, document, $) {

    "use strict";

    OI.UTIL.ChannelsGrid = function () {
        var $window = $(window),
            buttonViewChannel = $('.see-all a'),
            closeButton = $('#close-button-grid-channels'),
            selectTvPackage= $('#select-tv-package'),
            channelGrid = $('#channel-grid'),
            packagesConfigChannels,

            packageSidebar = $('#package-sidebar'),
            packageContent = $('#package-content'),
            channelList = packageContent.find('.channel-list'),
            typeClient,
            priceValue = $('p.price').find('.value'),
            discountDuration = $('p.price').find('.discount-duration'),
            priceCondition = $('.package-price').find('.price-condition'),

            
            packagesDetails = $('#package-details'),
            totalChannels = packagesDetails.find('.total-channels'),
            channelSide = packageSidebar.find('ul').find('li'),
            channelDetails = packagesDetails.find('.channels-details'),
            mainPage = $('#main'),
            scrollTopPosition,
 
            btPay = packageContent.find('.pay-la-carte'),

            updateChannelGrid = function (packageChannel) {
                var listChannelsOff = packagesConfigChannels[packageChannel].listChannelsOff,
                    channel = channelList.find('ul').find('li'),
                    numberPayChannels = packagesConfigChannels[packageChannel].numberPayChannels,
                    hdChannels = packagesConfigChannels[packageChannel].numberHDChannels,
                    listSideIndex = channelSide.index(),
                    channelListIndex = channelList.index();

                
                    discountDuration.html(packagesConfigChannels[packageChannel].discountDuration[typeClient]);
                    priceCondition.html(packagesConfigChannels.typeClients[typeClient]);
                    totalChannels.html('<strong>'+numberPayChannels+'</strong><span>Canais no <br />seu plano</span><strong class="plus">+</strong><div></div>');
                    
                    

                    /* ADD NUMEROS DE CANAIS SIDEBAR */
                    for(var n = 0; n < channelSide.length; n++){
                        var nChannels = packagesConfigChannels[packageChannel].numberChannels;
                            
                            channelSide.eq(n).find('.number').html(''+ nChannels[n] +'' );
                    }

                    pricesLacarte(packageChannel);
                    channelDetails.html('');
                    
                    channel.removeClass('disabled');

                    for(var i = 0; i < channelList.length; i++){

                        var offChannels = packagesConfigChannels[packageChannel].listChannelsOff[i],
                            offChannelsLength = offChannels.length;


                        if (offChannelsLength == 1) {
                            if(offChannels[0] == 'all'){
                                channelList.eq(i).find('ul').find('li').addClass('disabled');
                            }else if(offChannels[0] != 'none'){
                                channelList.eq(i).find('ul').find('li.'+offChannels[0]).addClass('disabled');
                            }
                        } else{

                            for(var e = 0; e < offChannelsLength; e++){
                                channelList.eq(i).find('ul').find('li.'+offChannels[e]).addClass('disabled');
                            }
                        };
                    }
                
            },
            selectTvPackageChange = function () {
                updateChannelGrid(this.value);
            },
            pricesLacarte = function(packageChannel) {
                var dataPrice = btPay.data('price');
                var price = packagesConfigChannels[packageChannel].price[typeClient][0];
                    priceValue.html(price);

                /* ADD PRECOS DOS CANAIS PAGOS */
                for(var p = 0; p < btPay.length; p++){
                    var payChannels = packagesConfigChannels[packageChannel].payChannelsLC;  
                    var originalValue = btPay.eq(p).html('Adicione por R$ '+ payChannels[p] +"");

                    var thisDataPrice = btPay.eq(p).attr('data-price', payChannels[p]);

                        btPay.removeClass("deactived").addClass("active");
                        jQuery.data( btPay.eq(p).get(0), 'originalValue', originalValue.html() );
                }
                
                
               // eventos dos preÃ§os
                btPay.unbind('click').bind({
                    click: function() {
                        var self = $(this),
                            thisDataChannel = self.data("channel-lc"),
                            thisDataPrice = self.attr("data-price");
                            
                            activedInactive(price,self, thisDataChannel,thisDataPrice);
                    },
                    mouseenter:function(){
                        var hover = $(this).text(); 

                            if (hover === "Adicionado") {
                                $(this).html('Remover')
                            };
                    },
                    mouseleave:function(){
                        var hover = $(this).text(); 

                            if (hover === "Remover") {
                                $(this).html('Adicionado')
                            }
                    }
                });

            },
            buttonClearChannel = function(price, self, thisDataChannel,thisDataPrice){
                var thisAnchor = $(".total-channels div [href$='#"+thisDataChannel+"']");
                    

                thisAnchor.bind('click',function(e){
                    var auto = $(this);
                        clearChannelTitleInHeader(price, self, thisDataChannel,thisDataPrice);
                        auto.remove();
                        e.preventDefault();
                });
            },
            activedInactive = function(price, self, thisDataChannel,thisDataPrice){
                var actived = self.hasClass('active');
                   
                if (actived) {
                    self.click(
                        inputChannelTitleInHeader(price,self,thisDataChannel,thisDataPrice),
                        buttonClearChannel(price, self, thisDataChannel,thisDataPrice)
                    );
                } else {
                    self.click(
                        clearChannelTitleInHeader(price,self,thisDataChannel,thisDataPrice)
                    );
                }
                
            },
            inputChannelTitleInHeader = function(price, self,thisDataChannel,thisDataPrice) {
                var price = priceValue.html(),
                    newPrice = parseFloat(price) + parseFloat(thisDataPrice),
                    updatePrice = priceValue.html(newPrice.toFixed(2)),
                    inHeader = $(".total-channels").find('div'),
                    headerSize = $(".total-channels").find('div').find('a').length; 

                    inHeader.append('<a href="#'+thisDataChannel+'">'+thisDataChannel.replace('-',' ')+'<span class="clear"></span></a>');
                    inHeader.find('a').addClass('inputed-channel-head'); 

                    if(headerSize >= 0) { totalChannels.find('.plus').show(); }
                    self.removeClass("active").addClass("deactived").html("Adicionado");

            },
            clearChannelTitleInHeader = function(price, self, thisDataChannel, thisDataPrice) {
                var price = priceValue.html(),
                    newPrice = parseFloat(price) - parseFloat(thisDataPrice),
                    updatePrice = priceValue.html(newPrice.toFixed(2)),
                    inHeader = $(".total-channels").find('div'),
                    headerSize = $(".total-channels").find('div').find('a').length;

                    $('.total-channels [href$="#'+thisDataChannel+'"]').remove();
                    
                    if(headerSize <= 1) { totalChannels.find('.plus').hide();}
                    self.removeClass("deactived").addClass("active").html( jQuery.data( self.get(0), 'originalValue' ) );
            },
            openChannelGrid = function (e) {
                var self = $(this),
                target = self.data('channel');
                channelGrid.show();

                updateChannelGrid(target);
                selectTvPackage.find('option[value='+target+']').attr('selected', true);

                mainPage.hide();
                scrollTopPosition = $window.scrollTop();
                $window.scrollTop(0);


                // reset listagem de canais
                channelList.fadeIn();
                channelSide.removeClass('active');
                channelSide.eq(0).addClass('active');

                e.preventDefault();
            },
            closeChannelGrid = function (e) {
                channelGrid.hide();
                mainPage.show();             
                e.preventDefault();
            },
            loadPackagesConfiguration = function (){
                //$.getJSON('scripts/packages-config-rj.json',
                $.getJSON('/ArquivosEstaticos/oi/scripts/oi-pra-voce/pacotes/internet-tv-fibra/packages-config-rj.json',
                    function (data){
                        packagesConfigChannels = data;
                        initialConfig();
                    }
                ).error(function (){
                    alert('NÃ£o foi possÃ­vel iniciar.');
                });
            },

            initialConfig = function (){
                typeClient = 1;
                var target = "maisHDChannels";
                //channelGrid.show();
                //mainPage.hide();
                updateChannelGrid(target);
                buttonViewChannel.click(openChannelGrid);
                closeButton.click(closeChannelGrid);
                selectTvPackage.change(selectTvPackageChange);
            };

        return {

            init: function () {
                loadPackagesConfiguration();
                this.bind();
            },
            bind : function(){
                var anchorSide = packageSidebar.find("a"),
                    gridHeight = channelGrid.height();


                anchorSide.bind('click', function(e) {
                    var self = $(this),
                        sideLink = self.attr('href').replace("#",""),
                        targetSide = $("[data-plans="+sideLink+"]");
                        

                        if (sideLink != "all") {
                            channelList.fadeOut(0);
                            targetSide.fadeIn(600);
                        } else {
                            channelList.fadeIn(600);
                        }
                        $('html, body').animate({
                            scrollTop: $("body").offset().top
                        }, 600);
                        channelSide.removeClass('active');
                        self.parent().addClass('active');
                        e.preventDefault();
                });

                $(window).bind('scroll',function () {
                    var packHeight = packageSidebar.height(),
                        windowHeight = $(window).height(),
                        windowTop = $(window).scrollTop();

                    if ( windowHeight > (packHeight + 142)) {
                          packageSidebar.css({"position":"fixed","top":"142","bottom":"auto"});
                    } else {
                        packageSidebar.css({"position":"absolute"});
                        if ( windowTop < ((packHeight - windowHeight) + 142) ) {
                            packageSidebar.css({"position":"absolute","bottom":"auto","top":"142px"});
                        } else {
                            packageSidebar.css({"position":"fixed","bottom":"0","top":"auto"});
                        }
                    }
                });
                
            }   

        };
    };

    $(function () { 
       if(!preventTwice)
        {
            var channelsGrid = new OI.UTIL.ChannelsGrid();
            channelsGrid.init();
            preventTwice = true;
        }
    });

}(window, document, jQuery));