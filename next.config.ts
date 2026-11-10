import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);

// Беремо назву репозиторію з process.env або встановлюємо за замовчуванням
const githubRepository = process.env.GITHUB_REPOSITORY ?? '';
const repo = githubRepository ? githubRepository.replace(/.*?\//, '') : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  basePath: isGithubActions && repo ? `/${repo}` : '',
  assetPrefix: isGithubActions && repo ? `/${repo}/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
