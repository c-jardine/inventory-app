import { HeaderBar } from '@/core';
import { MaterialsTable } from '@/features/material/components';
import { db } from '@/server/db';
import { api } from '@/utils/api';
import { Container } from '@chakra-ui/react';
import {
  type GetStaticPaths,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';

export default function Material(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { category } = props;

  const { data } = api.category.getBySlug.useQuery({ slug: category.slug });

  return (
    <>
      <Head>
        <title>{category.name} | Inventory Tracker</title>
        <meta
          name='description'
          content='An inventory tracking app handling stock levels, pricing, production runs, and more.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Container maxW='container.xl' p={{ base: 4, sm: 8 }}>
          <HeaderBar>{category.name}</HeaderBar>
          {data?.materials && <MaterialsTable materials={data.materials} />}
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const category = await db.category.findFirst({
    where: {
      slug: context.params?.slug,
    },
  });

  if (!category) {
    return {
      redirect: {
        destination: '/materials',
      },
    };
  }

  return {
    props: {
      category,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await db.category.findMany({
    select: {
      slug: true,
    },
  });
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: 'blocking',
  };
};
