import React from 'react';
import Slider from 'react-slick';
import { Box, Avatar, Link } from '@chakra-ui/react';

export interface CarouselAvatarProps {
  displayData: DisplayData[];
}

export interface DisplayData {
  strTeamBadge?: string;
  strWebsite?: string;
  strTeam?: string;
}

export const CarouselAvatar: React.FC<CarouselAvatarProps> = (props) => {
  const { displayData } = props;
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    draggable: true,
    slidesToScroll: 1,
    slidesToShow: 20,
    response: ['640px', '1000px', '1700px'],
    arrows: false,
  };
  return (
    <Box>
      <Slider {...settings}>
        {displayData &&
          displayData.map((item, i) => {
            return (
              <Box mb={4} key={i}>
                <Link href={`https://${item?.strWebsite}`} isExternal>
                  <Avatar
                    size="lg"
                    src={item?.strTeamBadge}
                    name={item?.strTeam}
                    borderColor="white"
                    showBorder
                  ></Avatar>
                </Link>
              </Box>
            );
          })}
      </Slider>
    </Box>
  );
};
