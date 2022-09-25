# frozen_string_literal: true

FactoryGirl.define do
  factory :comment do
    content { FFaker::Lorem.paragraph }
    user

    trait :for_post do
      association :commentable, factory: :post
    end

    trait :comment_reply do
      association :commentable, factory: :comment
    end
  end
end
