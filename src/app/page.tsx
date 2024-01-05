"use client";
import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import styles from "./page.module.css";
import { addYears, differenceInWeeks, isPast, startOfWeek } from "date-fns";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date("1970-01-01"));
  const [showBlocks, setShowBlocks] = useState(false);

  // Calculate the number of years from the birthday to the expected lifespan (80 years)
  const totalYears = 80;

  // Generate an array of years from the birthday to the expected lifespan
  const yearsArray = Array.from({ length: totalYears }, (_, index) =>
    addYears(selectedDate, index)
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    setShowBlocks(true);
  };

  // Calculate the number of Sundays left
  const today = new Date();
  const weeksPassed = differenceInWeeks(today, startOfWeek(selectedDate));

  // Adjust for the current week
  const weekLeft = totalYears * 52 - weeksPassed;

  return (
    <div className={styles.container}>
      <Head>
        <title>Your Life Blocks</title>
        <meta name="description" content="See the blocks of your life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <label htmlFor="name" className={styles.label}>
          Who are you?
        </label>
        <input
          type="text"
          id="name"
          placeholder="Your name"
          className={styles.input}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label htmlFor="birthday" className={styles.label}>
          Select Your Birthday:
        </label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          value={selectedDate.toISOString().split("T")[0]} // Format date for input value
          onChange={handleDateChange}
          className={styles.input}
        />

        {showBlocks && name.length > 0 && (
          <>
            <p className={styles.paragraph}>
              {name}, only {weekLeft} Sundays remain
            </p>
            <div className={styles.grid}>
              {yearsArray.map((year, index) => (
                <div
                  key={index}
                  className={`${styles.block} ${
                    isPast(year) ? styles.past : styles.future
                  }`}
                />
              ))}
            </div>
            <p className={styles.paragraph}>
              How are you going to spend these Sundays, {name}?
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
