import api from "../lib/api";

import { useState } from "react";
import { useQuery } from "react-query";
import { GetServerSideProps } from "next";

import PageLayout from "../components/v1/layout/PageLayout";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <PageLayout meta={{ title: 'Сторінку не знайдено' }}>
      <div className="page-error">
        <div className="page-error-description">
          <p className="page-error-title">Сторінку не знайдено</p>
          <p>
            Ми не змогли знайти потрібну тобі сторінку.
            <br />
            Пропонуємо повернутись на <Link href="/"><a>головну сторінку</a></Link>.
          </p>
        </div>
        <div style={{ margin: '30px auto 0 auto', opacity: '0.5', textAlign: 'center' }}>
          <img width="400px" src="/assets/404.gif" />
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;
