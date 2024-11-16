'use client';
import { memo, useEffect, useRef } from 'react';

import {
    ChartingLibraryWidgetOptions,
    LanguageCode,
    ResolutionString,
    widget,
} from '@/public/static/charting_library';

export const TradingViewChartMain = memo(
    (props: Partial<ChartingLibraryWidgetOptions>) => {
        const chartContainerRef =
            useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

        useEffect(() => {
            if (!window) return;
            const widgetOptions: ChartingLibraryWidgetOptions = {
                // symbol: "NYSE",
                symbol: props.symbol,
                // BEWARE: no trailing slash is expected in feed URL
                datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
                    // 'https://demo-feed-data.tradingview.com',
                    // 'https://demo-feed-data.tradingview.com/',
                    '/api',
                    undefined,
                    {
                        maxResponseLength: 1000,
                        expectedOrder: 'latestFirst',
                    }
                ),
                interval: '1' as ResolutionString,
                container: chartContainerRef.current,
                library_path: props.library_path,
                locale: props.locale as LanguageCode,
                overrides: {
                    'linetoolghostfeed.candleStyle.downColor': '#CD2B31',
                    'linetoolghostfeed.candleStyle.upColor': '#99D52A',
                },
                disabled_features: [
                    'volume_force_overlay',
                    'use_localstorage_for_settings',
                    'adaptive_logo',
                    'charting_library_debug_mode',
                    'symbol_search_hot_key',
                    'save_shortcut',
                    'header_symbol_search',
                    'header_compare',
                    'header_settings',
                    'header_quick_search',
                ],
                enabled_features: [],
                charts_storage_url: props.charts_storage_url,
                charts_storage_api_version: props.charts_storage_api_version,
                client_id: props.client_id,
                user_id: props.user_id,
                fullscreen: props.fullscreen,
                theme: 'dark',
                custom_css_url: './theme.css',
                custom_font_family: 'Giest',
                debug: false,
                time_scale: {
                    min_bar_spacing: 30,
                },
                loading_screen: {
                    backgroundColor: '#0D0D0D',
                    foregroundColor: '#fff',
                },

                autosize: props.autosize,
            };

            const tvWidget = new widget(widgetOptions);

            tvWidget.applyOverrides({
                'mainSeriesProperties.visible': true,
                // candle
                'mainSeriesProperties.candleStyle.downColor': '#CD2B31',
                'mainSeriesProperties.candleStyle.upColor': '#99D52A',
                'mainSeriesProperties.candleStyle.wickColor': '#99D52A',
                'mainSeriesProperties.candleStyle.wickDownColor': '#CD2B31',
                'mainSeriesProperties.candleStyle.borderUpColor': '#99D52A',
                'mainSeriesProperties.candleStyle.borderDownColor': '#CD2B31',
                // hollow candles
                'mainSeriesProperties.hollowCandleStyle.upColor': '#99D52A',
                'mainSeriesProperties.hollowCandleStyle.downColor': '#CD2B31',
                // bar
                'mainSeriesProperties.barStyle.downColor': '#CD2B31',
                'mainSeriesProperties.barStyle.upColor': '#99D52A',
                // line
                'mainSeriesProperties.lineStyle.color': '#FF7009',
                // line with markers
                'mainSeriesProperties.lineWithMarkersStyle.color': '#FF7009',
                // columns
                'mainSeriesProperties.columnStyle.upColor': '#99D52A',
                'mainSeriesProperties.columnStyle.downColor': '#CD2B31',
                // area style
                'mainSeriesProperties.areaStyle.linecolor': '#FF7009',
                'mainSeriesProperties.areaStyle.color1': '#FF7009', // Change the first color of the gradient
                'mainSeriesProperties.areaStyle.color2': '#FF7009',
                // stepLine
                // HLC
                'mainSeriesProperties.hlcAreaStyle.highLineColor': '#FF7009',
                'mainSeriesProperties.hlcAreaStyle.closeLineColor': '#FF7009',
                // base lint
                'mainSeriesProperties.baselineStyle.topLineColor': '#99D52A',
                'mainSeriesProperties.baselineStyle.bottomLineColor': '#CD2B31',
                // heikin aishi
                'mainSeriesProperties.haStyle.downColor': '#CD2B31',
                'mainSeriesProperties.haStyle.upColor': '#99D52A',
                'mainSeriesProperties.haStyle.wickColor': '#99D52A',
                'mainSeriesProperties.haStyle.wickDownColor': '#CD2B31',
                'mainSeriesProperties.haStyle.borderUpColor': '#99D52A',
                'mainSeriesProperties.haStyle.borderDownColor': '#CD2B31',
                // high low
                'mainSeriesProperties.hiloStyle.color': '#FF7009',
                'mainSeriesProperties.hiloStyle.labelColor': '#FF7009',
                'mainSeriesProperties.hiloStyle.borderColor': '#FF7009',
                // Panel
                'paneProperties.background': '#0D0D0D',
                'paneProperties.backgroundType': 'solid',
            });

            tvWidget.onChartReady(() => {
                tvWidget.headerReady().then(() => {
                    // const button = tvWidget.createButton();
                    // tvWidget.chart().onHoveredSourceChanged().subscribe(null, (e) => {
                    //   console.log(e, "ee")
                    // })
                    // button.setAttribute('title', 'Click to show a notification popup');
                    // button.classList.add('apply-common-tooltip');
                    // button.addEventListener('click', () =>
                    //   tvWidget.showNoticeDialog({
                    //     title: 'Notification',
                    //     body: 'TradingView Charting Library API works correctly',
                    //     callback: () => {
                    //       console.info('Noticed!');
                    //     },
                    //   })
                    // );
                    // button.innerHTML = 'Check API';
                });
            });

            return () => {
                tvWidget.remove();
            };
        }, [props]);

        return <div ref={chartContainerRef} className='h-[475px] rounded-lg' />;
    }
);

TradingViewChartMain.displayName = "TradingViewChartMain";
