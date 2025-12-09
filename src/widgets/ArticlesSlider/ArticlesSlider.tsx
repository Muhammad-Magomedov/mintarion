"use client";

import { useRef } from "react";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useThemeStore } from "@/features/toggle-theme";
import {
  ArticleCard,
  useArticles,
  type IArticleCardProps,
} from "@/entities/article";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import type { Swiper as ISwiper } from "swiper";
import type { SwiperOptions } from "swiper/types";
import type { IArticleBaseData } from "@/shared/types/entities/article";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  loop?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: {
    delay?: number;
  };
  limit?: number;
  cardProps?: Omit<IArticleCardProps, "data">;
}

export const ArticlesSlider: React.FC<Props> = ({
  className = "",
  title,
  loop = false,
  slidesPerView = 1,
  spaceBetween = 0,
  autoplay = {
    delay: 3000,
  },
  limit = 10,
  cardProps,
  ...props
}) => {
  const { theme } = useThemeStore();
  const swiperRef = useRef<ISwiper | null>(null);

  const { data } = useArticles();

  return (
    <div className={cn(styles.content, className)} {...props}>
      <div className={styles.header}>
        {title ? (
          <h3 className={cn(styles.title, "title--2xl")}>{title}</h3>
        ) : (
          <span></span>
        )}
        <div className={styles.sliderBtnList}>
          <Button
            className={cn(
              styles.sliderBtn,
              styles.prevEl,
              "recaps-slider-prev-el"
            )}
            variant="primary"
            shape="square"
          >
            <ChevronLeft color={theme === "dark" ? "#D4D4D4" : "#3D693C"} />
          </Button>
          <Button
            className={cn(
              styles.sliderBtn,
              styles.nextEl,
              "recaps-slider-next-el"
            )}
            variant="primary"
            shape="square"
          >
            <ChevronRight color={theme === "dark" ? "#D4D4D4" : "#3D693C"} />
          </Button>
        </div>
      </div>
      <Swiper
        loop={loop}
        modules={[Navigation, A11y]}
        navigation={{
          nextEl: ".recaps-slider-next-el",
          prevEl: ".recaps-slider-prev-el",
        }}
        autoplay={{
          delay: autoplay?.delay ?? 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={styles.slider}
      >
        {data?.data.slice(0, limit).map((data) => (
          <SwiperSlide key={data.id} className={styles.slide}>
            <ArticleCard data={data} orientation="vertical" {...cardProps} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
