"use client";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  A11y,
} from "swiper/modules";
import { ChevronsLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useThemeStore } from "@/features/toggle-theme";
import { RecapCard, type IRecapBaseData } from "@/entities/recaps";
import { Button } from "@/shared/ui/Button/Button";
import { useTopNews } from "@/entities/news";
import styles from "./styles.module.scss";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import type { Swiper as ISwiper } from "swiper";

export const DailyRecaps: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const [recaps, setRecaps] = useState<IRecapBaseData[]>([]);
  const [sliderSettings, setSliderSettings] = useState<{ slidesPerView: number }>({
    slidesPerView: 5
  })

  const { theme } = useThemeStore();
  const { data: topNewsData } = useTopNews();
  const swiperRef = useRef<ISwiper | null>(null);

  useEffect(() => {
    if (topNewsData?.items) {
      setRecaps((prev) => [
        ...prev,
        ...topNewsData.items.map(({ ID: id, title, text, url }) => ({
          id,
          url,
          title,
          description: text,
          imgSrc: "",
        }))
      ])
    }
  }, [topNewsData])

  const goToFirstSlide = () => {
    if (swiperRef) {
      swiperRef.current?.slideTo(0);
    }
  }

  return (
    <div className={cn(styles.content, className)} {...props}>
      <div className={styles.header}>
        <h3 className={cn(styles.title, "title--2xl")}>Daily Recaps</h3>
        <div className={styles.sliderBtnList}>
          {recaps.length > sliderSettings.slidesPerView && (
            <Button
              className={cn(styles.sliderBtn)}
              variant={theme === "dark" ? "black" : "white"}
              onClick={goToFirstSlide}
              shape="square"
            >
              <ChevronsLeft color={theme === "dark" ? "#D4D4D4" : "#3D693C"} />
            </Button>
          )}
          <Button
            className={cn(styles.sliderBtn, styles.prevEl, "recaps-slider-prev-el")}
            variant={theme === "dark" ? "black" : "white"}
            shape="square"
          >
            <ChevronLeft color={theme === "dark" ? "#D4D4D4" : "#3D693C"} />
          </Button>
          <Button
            className={cn(styles.sliderBtn, styles.nextEl, "recaps-slider-next-el")}
            variant={theme === "dark" ? "black" : "white"}
            shape="square"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, A11y]}
        navigation={{
          nextEl: ".recaps-slider-next-el",
          prevEl: ".recaps-slider-prev-el",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={10}
        slidesPerView={sliderSettings.slidesPerView}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={styles.slider}
      >
        {recaps.map((data) => (
          <SwiperSlide key={data.id} className={styles.slide}>
            <RecapCard data={data} as="link" target="_blank" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};