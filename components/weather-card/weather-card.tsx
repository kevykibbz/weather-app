import { WeatherData } from "@/types/weather";
import {
  Sun,
  Cloud,
  Wind,
  Droplets,
  Calendar,
  MapPin,
  Search,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { JSX } from "react";

interface WeatherCardProps {
  weather: WeatherData;
  unit: "celsius" | "fahrenheit";
  onUnitChange: (unit: "celsius" | "fahrenheit") => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const WeatherIcon = ({ icon, size = 48 }: { icon: string; size?: number }) => {
  const iconMap: Record<string, JSX.Element> = {
    "01d": <Sun className="text-yellow-400" size={size} />,
    "01n": <Sun className="text-yellow-200" size={size} />,
    "02d": <Cloud className="text-gray-400" size={size} />,
    "02n": <Cloud className="text-gray-300" size={size} />,
    "03d": <Cloud className="text-gray-500" size={size} />,
    "03n": <Cloud className="text-gray-400" size={size} />,
    "04d": <Cloud className="text-gray-600" size={size} />,
    "04n": <Cloud className="text-gray-500" size={size} />,
    "09d": <Droplets className="text-blue-400" size={size} />,
    "09n": <Droplets className="text-blue-300" size={size} />,
    "10d": <Droplets className="text-blue-500" size={size} />,
    "10n": <Droplets className="text-blue-400" size={size} />,
    "11d": <Cloud className="text-purple-500" size={size} />,
    "11n": <Cloud className="text-purple-400" size={size} />,
    "13d": <Cloud className="text-blue-200" size={size} />,
    "13n": <Cloud className="text-blue-100" size={size} />,
    "50d": <Wind className="text-gray-300" size={size} />,
    "50n": <Wind className="text-gray-200" size={size} />,
  };
  return iconMap[icon] || <Cloud size={size} />;
};

export const WeatherCard = ({
  weather,
  unit,
  onUnitChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  isLoading,
}: WeatherCardProps) => {
  const convertTemp = (temp: number) => {
    return unit === "fahrenheit" ? (temp * 9) / 5 + 32 : temp;
  };

  const formatDate = (timestamp: number, timezone: number) => {
    return new Date((timestamp + timezone) * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Section */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between h-screen max-h-[600px] transition-transform duration-200 hover:scale-110"
        variants={itemVariants}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col justify-between items-center h-full w-full max-w-sm p-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-10 w-36" />
                <Skeleton className="h-8 w-48" />
              </div>

              <div className="mt-auto space-y-4 flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center h-full">
            {/* Centered Weather Icon and Temp */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <WeatherIcon icon={weather.icon} size={120} />
              <span className="text-4xl font-bold mt-6">
                {Math.round(convertTemp(weather.temp))}°
                {unit === "celsius" ? "C" : "F"}
              </span>
              <span className="text-xl text-gray-600 capitalize mt-2">
                {weather.description}
              </span>
            </div>

            {/* Date and Location at Bottom */}
            <div className="mt-auto w-full space-y-4 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <Calendar size={24} className="text-gray-500" />
                <span className="font-medium text-lg">
                  {formatDate(weather.dt, weather.timezone)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={24} className="text-gray-500" />
                <span className="font-medium text-lg">
                  {weather.location}, {weather.country}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="space-y-6 w-full md:w-[120%] h-screen max-h-[600px] flex flex-col"
        variants={itemVariants}
      >
        {/* Search and Unit Toggle Row */}
        <div className="flex justify-between gap-4">
          <motion.form
            onSubmit={onSearch}
            className="flex-1 flex items-center"
            variants={itemVariants}
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Search city..."
                className="w-full pl-10 pr-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Go
            </button>
          </motion.form>

          {/* Unit Toggle */}
          <motion.div
            className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg"
            variants={itemVariants}
          >
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-[64px] rounded-md bg-gray-200 " />
                <Skeleton className="h-10 w-[64px] rounded-md bg-gray-200" />
              </>
            ) : (
              <>
                <button
                  onClick={() => onUnitChange("celsius")}
                  className={`px-4 py-2  cursor-pointer rounded-md ${
                    unit === "celsius" ? "bg-blue-500 text-white" : "bg-white"
                  }`}
                >
                  °C
                </button>
                <button
                  onClick={() => onUnitChange("fahrenheit")}
                  className={`px-4 py-2  cursor-pointer rounded-md ${
                    unit === "fahrenheit"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  °F
                </button>
              </>
            )}
          </motion.div>
        </div>

        {/* 3-Day Forecast */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm flex-1"
          variants={itemVariants}
        >
          <h3 className="font-bold text-xl mb-6">3-Day Forecast</h3>
          {isLoading ? (
            <div className="flex justify-between gap-6">
              {[1, 2, 3].map((day) => (
                <div
                  key={day}
                  className="flex-1 flex flex-col items-center justify-between bg-gray-100 p-4 rounded-lg"
                >
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-8 w-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-between gap-6">
              {[1, 2, 3].map((day) => (
                <motion.div
                  key={day}
                  className="flex-1 flex flex-col items-center justify-between bg-gray-50 p-4 rounded-xl border cursor-pointer shadow-lg transition-all"
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="text-gray-600">Day {day}</span>
                  <WeatherIcon icon={weather.icon} size={48} />
                  <span className="text-xl font-semibold">
                    {Math.round(convertTemp(weather.temp - day * 2))}°
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Bottom Row - Wind and Humidity */}
        <div className="flex gap-6 flex-1">
          {/* Wind Status */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm flex-1 flex flex-col transition-transform duration-200 hover:scale-110"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Wind Status</h3>
              {isLoading ? (
                <Skeleton className="h-6 w-6 rounded-full" />
              ) : (
                <Wind size={24} className="text-gray-500" />
              )}
            </div>
            {isLoading ? (
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            ) : (
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Speed</span>
                  <span className="font-medium text-xl">
                    {weather.wind_speed} m/s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Direction</span>
                  <span className="font-medium text-xl">
                    {weather.wind_deg}°
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Humidity */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm flex-1 flex flex-col transition-transform duration-200 hover:scale-110"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Humidity</h3>
              {isLoading ? (
                <Skeleton className="h-6 w-6 rounded-full" />
              ) : (
                <Droplets size={24} className="text-blue-500" />
              )}
            </div>
            {isLoading ? (
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-3 w-full mt-2" />
              </div>
            ) : (
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Percentage</span>
                  <span className="font-medium text-xl">
                    {weather.humidity}%
                  </span>
                </div>
                <Progress value={weather.humidity} className="h-3 mt-2" />
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
